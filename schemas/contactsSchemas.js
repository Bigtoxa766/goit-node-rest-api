import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
        'string.min': 'Name повинен бути не менше 2 символів',
        'string.max': 'Name повинен бути не більше 30 символів',
        'any.required': "Name є обов'язковим полем"
    }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }).required().messages({
    'string.email': 'Email повинен бути дійсною адресою електронної пошти і містити @, com / net',
    'any.required': "Email є обов'язковим полем"
    }),
  phone: Joi.string().required().min(7).messages({
    'string.min': 'Phone має містити мінімум 7 символів',
    'any.requred': "Phone є обов'язковим полем"
  })
})
  .options({ abortEarly: false });

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).messages({
        'string.min': 'Name повинен бути не менше 2 символів',
        'string.max': 'Name повинен бути не більше 30 символів',
    }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  }).messages({
        'string.email': 'Email повинен бути дійсною адресою електронної пошти і містити @, com / net',
    }),
  phone: Joi.string().min(7).messages({
'string.min': 'Phone має містити мінімум 7 символів'
  })
}).or('name', 'email', 'phone').options({ abortEarly: false })