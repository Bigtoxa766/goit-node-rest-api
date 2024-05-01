import { isValidObjectId } from "mongoose";

// vlidation by user ID

export const vlidateId = (id) => {

  return isValidObjectId(id);
}