import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }).required(),
  phone: Joi.string().required().min(7),
  favorite: Joi.boolean(),
})
  .options({ abortEarly: false });

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }),
  phone: Joi.string().min(7)
}).or('name', 'email', 'phone').options({ abortEarly: false });

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required()
});