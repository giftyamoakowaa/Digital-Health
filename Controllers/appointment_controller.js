import AppointmentModel from "../models/appointment_models.js";
import DoctorModel from "../models/Doctors_models.js";
import UserModel from "../models/user_model.js";
import { appointmentSchema } from "../schema/appointment_schema.js";
import nodemailer from "nodemailer";

export const bookAppointment = async (req, res) => {
    try {
      const { error, value } = appointmentSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      const { patientId, doctorId, appointmentDate, notes } = value;
  
    // Check if doctor is available
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor || !doctor.availability) {
      return res.status(400).send("Doctor is not available");
    }

    // Create a new appointment
    const appointment = new AppointmentModel({
      patientId,
      doctorId,
      appointmentDate,
      notes
    });

    await appointment.save();

    // Notify doctor (via email for example)
    const patient = await UserModel.findById(patientId);
    sendNotification(doctor, patient, appointment);

    res.status(201).send({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Function to send email notification
const sendNotification = async (doctor, patient, appointment) => {
  try {
    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: doctor.contactDetails.email, // Doctor's email
      subject: "New Appointment Booking",
      text: `Dear Dr. ${doctor.name},\n\nYou have a new appointment booked by ${patient.firstName} ${patient.lastName} on ${appointment.appointmentDate}.\n\nNotes: ${appointment.notes}\n\nPlease log in to your account to view more details.\n\nBest regards,\nYour Clinic`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
