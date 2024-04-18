import jwt from "jsonwebtoken"
import HttpError from "../helpers/HttpError.js";


export const signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '1d'
  });

export const checkToken = (token) => {
  if (!token) throw HttpError(401, 'Unauthorized');

  try {

    const { id } = jwt.verify(token, process.env.SECRET);
    return id;

  } catch (error) {
    throw HttpError(401, 'Unauthorized');
  }
};