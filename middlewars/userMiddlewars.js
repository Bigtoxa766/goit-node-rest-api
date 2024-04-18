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