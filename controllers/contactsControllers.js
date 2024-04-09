import { addContact, listContacts, removeContact, updateContactData, updatedStatusContact} from "../services/contactsServices.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";

export const getAllContacts = catchAsyncErr(async (_, res) => {
  const contacts = await listContacts();
  
  res.status(200).json(contacts)
});

export const getOneContact = catchAsyncErr(async (req, res) => {
  const { contact } = req;

  res.status(200).json(contact);
});

export const deleteContact = catchAsyncErr(async (req, res) => {
  const { id } = req.params;

  const deletedContct = await removeContact(id);

  res.status(200).json(deletedContct);
});

export const createContact = catchAsyncErr(async (req, res) => {

  const { name, email, phone } = req.cont;
  const newUser = await addContact(name, email, phone)

  res.status(201).json(newUser)
});

export const updateContact = catchAsyncErr(async (req, res) => {
  const { contact, body } = req;

  const updatedContact = await updateContactData(contact.id, body)

  res.status(200).json(updatedContact)
});

export const updateStatusContact = catchAsyncErr(async (req, res) => {
  const { contact, body } = req;

  const updatedStatus = await updatedStatusContact(contact.id, body);

  res.status(200).json(updatedStatus);
})
