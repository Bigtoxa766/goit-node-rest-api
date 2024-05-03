import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import { resizeImg } from "../services/imageService.js";
import { signToken } from "../services/jwtServises.js";
import { sendEmail } from "../services/sendEmail.js";
import { loginUserServise, registerUserServise, updateUserAvatar } from "../services/userServises.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";

dotenv.config();

export const register = catchAsyncErr(async (req, res) => {

  const { newUser } = await registerUserServise(req.body);

  const veryfyEmail = {
    to: req.body.email,
    subject:  'Verify email',
    html:
      `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${newUser.verificationToken}">Click verify email</a>`
  }

  await sendEmail(veryfyEmail);
  
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  });
});

export const login = catchAsyncErr(async (req, res) => {
  const { user } = await loginUserServise(req.body);

  if (user && user.verify) {
    const token = signToken(user._id);
    user.token = token;
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    })
  } else {
    res.status(401).json('Email or password is wrong')
  }
});

export const logout = catchAsyncErr(async (req, res) => {
  const { token } = req.user;

  await User.findOneAndUpdate({token}, {token: null})

  res.status(204).json({
    message: 'No content'
  })
 })

export const getCurrent = (req, res) => {
  req.user.password = undefined;

  res.status(200).json({
    user: req.user
  })
};

export const updateAvatar = catchAsyncErr(async (req, res) => {
  if (req.file) {

    const avatar = await resizeImg(req.file);
    const user = await updateUserAvatar(req.user._id, avatar);
    
    res.status(200).json({
      avatrURL: user.avatarURL
    })
  }
});

export const veryfyUser = catchAsyncErr(async (req, res) => {
  const { verificationToken } = req.params;
  
  const user = User.findOne({ verificationToken });
  
  if (!user) {
    throw HttpError(404, 'Not found')
  };

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed")
  };

  await User.findOneAndUpdate(user, {
    verify: true,
    verificationToken: null
  });

  res.status(200).json({
    message: 'Verification successful'
  })
});

export const verifyEmail = catchAsyncErr(async (req, res) => {
  
  const { email } = req.body;
  const body = req.body;

  if (!body || Object.keys(body).length === 0 || !email) {
    throw HttpError(400, "missing required field email");
  };

  const user = await User.findOne({ email });
    
  if (!user) {
    throw HttpError(401);
  }
    
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const veryfyEmail = {
    to: req.body.email,
    subject: 'Verify email',
    html:
      `<a target="_blank" href="${process.env.BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
  }

  await sendEmail(veryfyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
});