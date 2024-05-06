import Joi from "joi";
import { REGEXP_PASS } from "../constants/constants.js";

export const registerUserSchema = Joi.object({
  password: Joi.string()
    .pattern(REGEXP_PASS)
    .min(8)
    .max(16)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }).required(),
  subscription: Joi.string()
});

export const loginUserShema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }).required(),
   password: Joi.string().required()
});

export const verificationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required field email",
  }),
});