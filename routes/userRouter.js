import express from "express";
import { uploadAvatar, checkLoginData, checkRegisterData, protect, verification } from "../middlewars/userMiddlewars.js";
import { getCurrent, login, logout, register, updateAvatar, verifyEmail, veryfyUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', checkRegisterData, register);
userRouter.post('/login', checkLoginData, login);

userRouter.get('/verify/:verificationToken', veryfyUser);
userRouter.post('/verify', verification, verifyEmail)

userRouter.get('/current', protect, getCurrent);
userRouter.post('/logout', protect, logout);
userRouter.patch('/avatars', protect, uploadAvatar, updateAvatar)

export { userRouter };