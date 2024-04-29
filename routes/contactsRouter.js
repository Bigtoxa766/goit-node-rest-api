import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {  checkCreateContactData, checkUpdateContactDta, checkUpdateContactStatusData } from "../middlewars/contactsMiddlewars.js";
import { protect } from "../middlewars/userMiddlewars.js";

const contactsRouter = express.Router();

contactsRouter.use(protect);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", checkCreateContactData,
  createContact);

contactsRouter.put("/:id",
  checkUpdateContactDta,
  updateContact);

contactsRouter.patch("/:id/favorite",
  checkUpdateContactStatusData,
  updateStatusContact);

export default contactsRouter;
