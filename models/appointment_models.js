import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  notes: { type: String }
}, {
  timestamps: true
});

const AppointmentModel = model('Appointment', appointmentSchema);
export default AppointmentModel;
