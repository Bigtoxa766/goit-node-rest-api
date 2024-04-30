import { isValidObjectId } from "mongoose";

export const vlidateId = (id) => {

  return isValidObjectId(id);
}