import { Router } from "express";
import { resetPassword, requestResetPassword  } from "../Controllers/resetPassword_controller.js";

export const resetPasswordRouter = Router();

resetPasswordRouter.post('/request/resetPassword', requestResetPassword);
resetPasswordRouter.post('/resetPassword', resetPassword);

export default resetPasswordRouter;

