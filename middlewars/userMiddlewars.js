import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { registerUserSchema, loginUserShema } from "../schemas/usersSchems.js";
import { checkToken } from "../services/jwtServises.js";
import { catchAsyncErr } from "../utils/catchAsyncErr.js";


const checkUserExistsService = (filter) => User.exists(filter);

export const checkRegisterData = catchAsyncErr(async (req, res, next) => {
  const { value, error } = registerUserSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "Bad request")
  }

  const isExist = await checkUserExistsService({ email: value.email });

  if (isExist) {
    throw HttpError(409, "Email in use")
  };

  req.body = value;

  next();
});

export const checkLoginData = (req, res, next) => {
  const { value, error } = loginUserShema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message)
  }

  req.body = value;

  next()
};

export const protect = catchAsyncErr(async (req, res, next) => {
  const getToken = req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];
  
  const userId = checkToken(getToken);

  if (!userId) {
    throw HttpError(401, "Unauthorized")
  };

  const currentUser = await User.findById(userId);

  if (!currentUser) {
    throw HttpError(401, "Unauthorized")
  };

  if (currentUser && currentUser.token === getToken) {

    req.user = currentUser;
    next();
  } else {
    
    res.status(401).json({
      message: 'Unauthorized'
    });
  };
});

const multerStorage = multer.diskStorage({
  destination: path.join('tmp'),
  filename: (req, file, callback) => {
    const extantion = file.mimetype.split('/')[1];

    callback(null, `${req.user.id}-${nanoid()}.${extantion}`)
  }
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true)
  } else {
    callback(HttpError(400, "Upload images only"), false)
  }
};

export const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
}).single('avatar');