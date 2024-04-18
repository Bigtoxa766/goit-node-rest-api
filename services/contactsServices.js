import HttpError from '../helpers/HttpError.js';
import { Contact } from '../models/contactModel.js';

async function listContacts(query, currentUser) {
try {
  const contactsQuery = Contact.find({owner: currentUser})

  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 3;
  const toSkip = (page - 1) * limit;

  contactsQuery.skip(toSkip).limit(limit)

  const contacts = await contactsQuery;
  const total = await Contact.countDocuments({owner: currentUser})

  if (!contacts) throw HttpError(404, "Not found");
  
  return {contacts, total};

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

async function addContact({name, email, phone, favorite}, owner) {
  try {
    const newContact = await Contact.create({name, email, phone, favorite, owner: owner.id});
    
    if (!newContact) throw HttpError(404, "Not found");
    
    return newContact;

} catch (err) {
  err.message
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
