import express from "express";
import { checkLoginData, checkRegisterData, protect } from "../middlewars/userMiddlewars.js";
import { getCurrent, login, logout, register } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', checkRegisterData, register);
userRouter.post('/login', checkLoginData, login);

userRouter.get('/current', protect, getCurrent);
userRouter.post('/logout', protect,  logout);

export { userRouter };