import HttpError from '../helpers/HttpError.js';
import { Contact } from '../models/contactModel.js';

async function listContacts() {
try {
  const contacts = await Contact.find().populate('owner');

  if (!contacts) throw HttpError(404, "Not found");
  
  return contacts;

} catch (err) {
  console.log(err.message)
}
};

async function getContact(id, contactOwner) {
  
  const contact = await Contact.findById(id);

  if (!contact || (contact.owner.toString() !== contactOwner.id)) {
    throw HttpError(404, "Contact not found")
  }
  
  return contact;
};

async function removeContact(contactId, contactOwner) {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: contactOwner
    });

    if (!deletedContact || (deletedContact.owner.toString() !== 
      contactOwner.id)) {
      throw HttpError(404, "Not found")
    };

    return deletedContact;
  } catch (error) {
    console.log(error.message)
  }
};

async function addContact({name, email, phone, fvorite}, owner) {
  try {
    const newContact = await Contact.create({name, email, phone, fvorite, owner: owner.id});

    if (!newContact) throw HttpError(404, "Not found");
    
    return newContact;

} catch (err) {
  console.log(err.message)
}
};

async function updateContactData(contactId, updatedContact, owner) {
  try {
  const updatedContactData = await Contact.findByIdAndUpdate(contactId, updatedContact, { new: true });
    
    if (!updatedContactData || (updatedContactData.owner.toString() !== owner.id)) {
      throw HttpError(404, "Not found")
    }
    
    return updatedContactData;

} catch (error) {
    console.log(error.message)
}
};

async function updatedStatusContact(contactId, body, owner) {
  try {
    const newStatus = await Contact.findByIdAndUpdate(contactId, body, { new: true });

    if (!newStatus || (newStatus.owner.toString() !== owner.id)) {
      throw HttpError(404, "Not found")
    }
    
    return newStatus;
    
  } catch (error) {
    console.log(error.message)
  }
};

export { addContact, getContact, removeContact, listContacts, updateContactData, updatedStatusContact };
