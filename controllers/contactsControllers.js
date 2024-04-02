import HttpError from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import {
  addContact, getContactById, listContacts, removeContact,
  updateContactData
} from "../services/contactsServices.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";

export const getAllContacts = catchAsyncErr(async (req, res) => {

  const contacts = await listContacts();

  if (!contacts) {
    throw HttpError(400, "Not found")
  }
  
  res.status(200).json(contacts)
});

export const getOneContact = catchAsyncErr(async (req, res) => {

  const contactId = req.params.id;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw HttpError(404, "Not found")
  }

  res.status(200).json(contact);
});

export const deleteContact = catchAsyncErr(async (req, res) => {

  const contactId = req.params.id;
  const contact = await removeContact(contactId);

  if (!contact) {
    throw HttpError(404, "Not found")
  }

  return res.status(200).json(contact)
});

export const createContact = catchAsyncErr(async (req, res) => {
  const { value, error } = createContactSchema.validate(req.body)
  
  if (error) {
    throw HttpError(400, error.message)
  }

  const { name, email, phone } = value;
  const newUser = await addContact(name, email, phone)

  res.status(201).json(newUser)
});

export const updateContact = catchAsyncErr(async (req, res) => {

  const { value, error } = updateContactSchema.validate(req.body)
  const { id } = req.params;

  if (error) {
    throw HttpError(400, error.message)
  }

  const newData = await updateContactData(id, value);

  if (!newData) {
    throw HttpError(400, "Not found")
  }

  res.status(200).json(newData)
});
