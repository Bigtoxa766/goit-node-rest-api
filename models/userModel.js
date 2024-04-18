import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userShema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
},{
  versionKey: false,
  timestamps: true
});

userShema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  };

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userShema.methods.checkPass = (candidate, heshPass) => bcrypt.compare(candidate, heshPass)

export const User = model('users', userShema);


 