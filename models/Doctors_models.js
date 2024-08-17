import { Schema, model } from "mongoose";

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    // required: true
  },
  availability: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  
  },
  phone: {
    type: String,
  
  },
  photo: {
    type: String // Path to the uploaded image
  }
});

const DoctorModel = model('Doctor', doctorSchema);
export default DoctorModel;
