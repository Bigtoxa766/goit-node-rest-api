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
  }),
   password: Joi.string()
});