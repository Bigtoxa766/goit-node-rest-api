import HttpError from '../helpers/HttpError.js';
import { Contact } from '../models/contactModel.js';

async function listContacts() {
try {
  const contacts = await Contact.find();

  if (!contacts) throw HttpError(404, "Not found");
  
  return contacts;

} catch (err) {
  console.log(err.message)
}
};

async function removeContact(contactId) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) throw HttpError(404, "Not found");

    return deletedContact;
  } catch (error) {
    console.log(error.message)
  }
};

async function addContact(name, email, phone, fvorite) {
  try {
    const newContactObj = {
      name,
      email,
      phone,
      fvorite
    };

    const newContact = await Contact.create(newContactObj);

    if (!newContact) throw HttpError(404, "Not found");
    
    return newContact;

} catch (err) {
  console.log(err.message)
}
};

async function updateContactData(contactId, updatedContact) {
  try {
  const updatedContactData = await Contact.findByIdAndUpdate(contactId, updatedContact, { new: true });
    
    if (!updatedContactData) throw HttpError(404, "Not found")
    
    return updatedContactData;

} catch (error) {
    console.log(error.message)
}
};

async function updatedStatusContact(contactId, body) {
  try {
    const newStatus = await Contact.findByIdAndUpdate(contactId, body, { new: true });

    if (!newStatus) throw HttpError(404, "Not found")
    
    return newStatus;
    
  } catch (error) {
    console.log(error.message)
  }
};

export { addContact, removeContact, listContacts, updateContactData, updatedStatusContact };
