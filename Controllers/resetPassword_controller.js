import { resetPasswordSchema } from "../schema/resetPassword_schema.js";
import userModel from "../models/user_model.js";
import AdminModel from "../models/admin_models.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Helper function to send email
const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${process.env.BASE_URL}/reset-password/${token}`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  // Request Reset Password (Send email with token)
  export const requestResetPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await userModel.findOne({ email });
      const admin = await AdminModel.findOne({ email });
  
      if (!user && !admin) return res.status(404).send('No account found with that email.');
  
      const payload = { email };
      const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
  
      await sendResetEmail(email, token);
  
      res.status(200).send('Password reset email sent.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Reset Password
  export const resetPassword = async (req, res) => {
    try {
      const { error } = resetPasswordSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      const { email, newPassword } = req.body;
      const user = await userModel.findOne({ email });
      const admin = await AdminModel.findOne({ email });
  
      if (!user && !admin) return res.status(404).send('No account found with that email.');
  
      const hashedPassword = await bcrypt.hash(newPassword, 12);
  
      if (user) {
        user.password = hashedPassword;
        await user.save();
      } else if (admin) {
        admin.password = hashedPassword;
        await admin.save();
      }
  
      res.status(200).send('Password reset successfully.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };