import  {nanoid}  from 'nanoid';

import { promises as fs } from "fs"
import path from 'path';

const contactsPath = path.resolve('db', 'contacts.json')

async function listContacts() {

try {
  const respRead = await fs.readFile(contactsPath)
  const contacts = JSON.parse(respRead);
  return contacts

} catch (err) {
  console.log(err.message)
}
};

async function getContactById(contactId) {

try {
  const respRead = await fs.readFile(contactsPath);
  const contactsArr = JSON.parse(respRead);

  const foundContact = contactsArr.find(contact =>
    contact.id === contactId);

  if (foundContact) {
    return foundContact;
  } else {
    console.log(null)
  }
} catch (error) {
   error.message
}
};

async function removeContact(contactId) {

try {
  const respRead = await fs.readFile(contactsPath);
  const contactsArr = JSON.parse(respRead);

  const indexToDelete = contactsArr.findIndex(contact =>
    contact.id === contactId);
  
  if (indexToDelete !== -1) {
    const deletedContact = contactsArr.splice(indexToDelete, 1)[0];
    
    await fs.writeFile(contactsPath,
      JSON.stringify(contactsArr));
    
    return deletedContact;
    
  } else {
    console.log(null)
  };
} catch (error) {
   error.message
  };
};

async function addContact(name, email, phone) {
  try {
    const respRead = await fs.readFile(contactsPath);
    const contactsArr = JSON.parse(respRead);

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }

    contactsArr.push(newContact)

    await fs.writeFile(contactsPath,
      JSON.stringify(contactsArr));
    
    return newContact;

} catch (err) {
  console.log(err.message)
}
};

async function updateContactData(contactId, updatedContact) {
  try {
    const respRead = await fs.readFile(contactsPath);
    const contactsArr = JSON.parse(respRead);

    const updatedContactsArr = contactsArr.map(contact => {

      if (contact.id === contactId) {
        return {
          ...contact,
          ...updatedContact
        }
      }

      return contact
    });

    await fs.writeFile(contactsPath,
      JSON.stringify(updatedContactsArr))

    return updatedContactsArr.find(contact =>
      contact.id === contactId);
  } catch (error) {
    console.log(err.message)
  }
}

export { addContact, removeContact, getContactById, listContacts, updateContactData };