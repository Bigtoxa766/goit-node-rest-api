import express from "express";
import { checkLoginData, checkRegisterData, protect } from "../middlewars/userMiddlewars.js";
import { getCurrent, login, logout, register } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', checkRegisterData, register);

userRouter.use(protect);

userRouter.post('/login', checkLoginData, login);
userRouter.get('/current', getCurrent);
userRouter.post('/logout', logout);

export { userRouter };