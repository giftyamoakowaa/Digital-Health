import { Router } from "express";
import { signUp, signIn } from '../Controllers/admin_controller.js';
import adminAuth from "../middlewares/auth.js"
import { addDoctor } from "../Controllers/Doctors_controllers.js";
import { remoteUpload } from "../middlewares/uploads.js";
import multer from "multer";

const adminRouter = Router();


adminRouter.post('/admin/signup', signUp);
adminRouter.post('/admin/signin', signIn);
adminRouter.post('/admin/add/doctor', adminAuth, remoteUpload.single('photo'), addDoctor);
export default adminRouter;
  