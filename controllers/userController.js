import { User } from "../models/userModel.js";
import { resizeImg } from "../services/imageService.js";
import { loginUserServise, registerUserServise, updateUserAvatar } from "../services/userServises.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";


export const register = catchAsyncErr(async (req, res) => {
  const { newUser } = await registerUserServise(req.body);
  
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  });
});

export const login = catchAsyncErr(async (req, res) => {
  const { user } = await loginUserServise(req.body);

  res.status(201).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
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
      user
    })
  }
});