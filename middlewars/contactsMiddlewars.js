import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModel.js";
import { createContactSchema, updateContactSchema, updateContactStatusSchema } from "../schemas/contactsSchemas.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";


export const checkCreateContactData = catchAsyncErr(async (req, _, next) => {
  const { value, error } = createContactSchema.validate(req.body);
  
  if (error) throw HttpError(400, error.message);
  
  req.cont = value;

  next();
});

export const checkUpdateContactDta = catchAsyncErr(async (req, _, next) => {
  const { value, error } = updateContactSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
});

export const checkUpdateContactStatusData = catchAsyncErr(async (req, _, next) => {
  const { value, error } = updateContactStatusSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  req.body = value;

  next();
})

// export const checkContactId = catchAsyncErr(async (req, _, next) => {
//   const { id } = req.params;
//   const isValid = Types.ObjectId.isValid(id);

//   if (!isValid) throw HttpError(404, "Contact not found");
  
//   const contacts = await Contact.findById(id, req.user);

//   if (!contacts || contacts.owner.toString() !== req.user.id) {
//     throw HttpError(404, "User not found")
//   }
  
//   req.contacts = contacts;

//   next();
// })
