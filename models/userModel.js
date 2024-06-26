import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
},{
  versionKey: false,
  timestamps: true
});

userShema.pre('save', async function (next) {

  if (this.isNew) {
    const emailHash = crypto.createHash('md5')
      .update(this.email)
      .digest('hex');
    
    this.avatarURL = `https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  }
  
  if (!this.isModified('password')) {
    return next()
  };

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userShema.methods.checkPass = (candidate, heshPass) => bcrypt.compare(candidate, heshPass)

export const User = model('users', userShema);


 