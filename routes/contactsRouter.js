import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { checkContactId, checkCreateContactData, checkUpdateContactDta, checkUpdateContactStatusData } from "../middlewars/contactsMiddlewars.js";
import { protect } from "../middlewars/userMiddlewars.js";

const contactsRouter = express.Router();

contactsRouter.use(protect);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactId, getOneContact);

contactsRouter.delete("/:id", checkContactId, deleteContact);

contactsRouter.post("/", checkCreateContactData,
  createContact);

contactsRouter.put("/:id", checkContactId,
  checkUpdateContactDta,
  updateContact);

contactsRouter.patch("/:id/favorite", checkContactId,
  checkUpdateContactStatusData,
  updateStatusContact);

export default contactsRouter;
