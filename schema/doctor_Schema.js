import Joi from 'joi';

export const doctorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  specialty: Joi.string().min(3).max(50),
  availability: Joi.boolean().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  photo: Joi.string().optional(), // This field will store the image path as a string
});

export default doctorSchema;
