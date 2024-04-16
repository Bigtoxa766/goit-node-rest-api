import { User } from "../models/userModel.js";
import { loginUserServise, registerUserServise } from "../services/userServises.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";


export const register = catchAsyncErr(async (req, res) => {
  const { newUser } = await registerUserServise(req.body);
  
  res.status(201).json({
    user: newUser
  });
});

export const login = catchAsyncErr(async (req, res) => {
  const { user } = await loginUserServise(req.body);

  res.status(201).json({
    user
  })
});

export const logout = catchAsyncErr(async (req, res) => {
  // const { id } = req.user;
  const { token } = req.user;

  console.log(token)

  await User.findOneAndUpdate({token}, {token: null})

  // await User.findByIdAndUpdate(id, { token: null });

  res.status(204).json({
    message: 'No content'
  })
 })

export const getCurrent = (req, res) => {
  req.user.password = undefined;

  res.status(200).json({
    user: req.user
  })
}