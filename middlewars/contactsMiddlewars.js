import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModel.js";
import { createContactSchema, updateContactSchema, updateContactStatusSchema } from "../schemas/contactsSchemas.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";


export const checkCreateContactData = catchAsyncErr(async (req, _, next) => {
  const { value, error } = createContactSchema.validate(req.body);
  
  if (error) throw HttpError(400, error.message);

  const contactNameExist = await Contact.exists({ name: value.name });
  const contactEmailExist = await Contact.exists({ email: value.email });
  const contactPhoneExist = await Contact.exists({ phone: value.phone });
  
  if (contactNameExist || contactEmailExist || contactPhoneExist) throw HttpError(409, "Contact already exist")
  
  req.cont = value;

  next();
});

export const checkUpdateContactDta = catchAsyncErr(async (req, res, next) => {
  const { value, error } = updateContactSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
});

export const checkUpdateContactStatusData = catchAsyncErr(async (req, res, next) => {
  const { value, error } = updateContactStatusSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
})

export const checkContactId = catchAsyncErr(async (req, res, next) => {
  const { id } = req.params;
  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) throw HttpError(404, "User not found");
  
  const contact = await Contact.findById(id);

  if (!contact) throw HttpError(404, "User not found")
  
  req.contact = contact;

  next();
})

