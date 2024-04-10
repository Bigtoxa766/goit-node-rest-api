import { model, Schema } from "mongoose";

const contactShema = new Schema({
  name: {
    type: String,
    require: [true, 'Set name for contact']
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
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