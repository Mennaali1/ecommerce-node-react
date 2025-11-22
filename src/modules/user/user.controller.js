import { userModel } from "../../../database/models/user.model.js";
import { catchAsyncError } from "../../../utils/catchError.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  changePassword,
} from "../handlers/factory.handler.js";

export const createUser = createOne(userModel);
export const getAllUsers = getAll(userModel);
export const getUser = getOne(userModel);
export const updateUser = updateOne(userModel);
export const deleteUser = deleteOne(userModel);
export const changeUserPassword = changePassword(userModel);
