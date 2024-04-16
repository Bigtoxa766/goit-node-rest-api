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
  versionKey: false,
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    }
});

export const Contact = model('contacts', contactShema)