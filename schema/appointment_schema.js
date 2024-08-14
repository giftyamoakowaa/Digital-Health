import Joi from 'joi';

export const appointmentSchema = Joi.object({
  patientId: Joi.string().required(), // Patient ID is now included and required
  doctorId: Joi.string().required(),
  appointmentDate: Joi.date().required(),
  notes: Joi.string().optional(),
});
