import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { signToken } from "./jwtServises.js";

export const registerUserServise = async (data) => {
  const token = signToken(data.id);
  data.token = token;

  const newUser = await User.create(data);

  newUser.password = undefined;

  return {newUser};
};

export const loginUserServise = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw HttpError(401, 'Unauthorized')
  }

  const passwordIsValide = await user.checkPass(password, user.password);

  if (!passwordIsValide) {
    throw HttpError(401, 'Unauthorized')
  }

  const token = signToken(user.id);

  await User.findByIdAndUpdate(user.id, { token });

  user.token = token;
  user.password = undefined;

  return { user };
};

// export const updateUserServise = async (user, updatedUser) => {
//   Object.keys(updatedUser).forEach(key => {
//     user[key] = updatedUser[key];
//   });

//   return user.save()
// };
