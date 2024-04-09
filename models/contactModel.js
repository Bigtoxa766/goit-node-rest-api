import { model, Schema } from "mongoose";

const contactShema = new Schema({
  name: {
    type: String,
    unique: true,
    require: [true, 'Set name for contact']
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, {
  versionKey: false
});

export const Contact = model('contacts', contactShema)