import { Router } from 'express';
import { bookAppointment } from '../Controllers/appointment_controller.js';
import { verifyJWT } from '../middlewares/auth.js'; // Assuming you have a JWT middleware for authentication

const appointmentRouter = Router();

appointmentRouter.post('/appointments', verifyJWT, bookAppointment);

export default appointmentRouter;
