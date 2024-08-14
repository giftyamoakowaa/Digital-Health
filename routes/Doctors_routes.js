import { Router } from "express";
import { getAllDoctors, getDoctorsBySpecialty } from '../Controllers/Doctors_controllers.js';

const DoctorRouter = Router();

DoctorRouter.get('/', getAllDoctors);
DoctorRouter.get('/specialty/:specialty', getDoctorsBySpecialty);

export default DoctorRouter;