import AdminModel from '../models/admin_models.js';
import DoctorModel from '../models/Doctors_models.js';
import doctorSchema from '../schema/doctor_Schema.js';


// Add Doctor
export const addDoctor = async (req, res) => {
  try {
    // Ensure that the file is received
    const photo = req.file?.filename;

    // Validate input data including the file
    const { error, value } = doctorSchema.validate({
      ...req.body,
      photo,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Retrieve user ID from session or request
    const userId = req.session?.user?.id || req?.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user exists
    const user = await AdminModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new doctor entry
    const newDoctor = await DoctorModel.create({
      ...value,
      user: userId,
    });

    res.status(201).json({ message: 'Doctor added', doctor: newDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.send(doctors);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getDoctorsBySpecialty = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({ specialty: req.params.specialty });
    res.send(doctors);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
