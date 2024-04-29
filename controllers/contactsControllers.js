import { vlidateId } from "../helpers/validateId.js";
import { addContact, getContact, listContacts, removeContact, updateContactData, updatedStatusContact} from "../services/contactsServices.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";

export const getAllContacts = catchAsyncErr(async (req, res) => {
  const {contacts, total} = await listContacts(req.query, req.user);
  
  res.status(200).json({
    total,
    contacts
  })
});

export const getOneContact = catchAsyncErr(async (req, res) => {
 
  if (vlidateId(req.params.id)) {
    const contact = await getContact(req.params.id, req.user);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({
        messge: 'Not found'
      })
    }
  } else {
    res.status(404).json({
      messge: 'Not found'
    })
  }
});

export const deleteContact = catchAsyncErr(async (req, res) => {

  if (vlidateId(req.params.id)) {
    const contact = await removeContact(req.params.id, req.user);
    if (contact) {
    res.status(200).json(contact)
  } else {
    res.status(404).json({
      message: "Not found"
    })
  }
  } else {
    res.status(404).json({
      message: "Not found"
    })
  }

});

export const createContact = catchAsyncErr(async (req, res) => {
  const newUser = await addContact(req.body, req.user);

  if (newUser) {
    res.status(201).json(newUser)
  } else {
    res.status(404).json({
      message: "Not found"
    })
  }
});

export const updateContact = catchAsyncErr(async (req, res) => {
 
  if (vlidateId(req.params.id)) {
    const update = await updateContactData(req.params.id, req.body, req.user)
console.log({update})
    if (update) {
    res.status(200).json({contact: update});
  } else {
    res.status(404).json({
      message: 'Contact not found'
    })
  };
  }
});

export const updateStatusContact = catchAsyncErr(async (req, res) => {
  if (vlidateId(req.params.id)) {
    const updatedStatus = await updatedStatusContact(req.params.id, req.body, req.user);

    if (updatedStatus) {
    res.status(200).json(updatedStatus);
  } else {
    res.status(404).json({
      message: "Contact no found"
    });
  }
  }
});
