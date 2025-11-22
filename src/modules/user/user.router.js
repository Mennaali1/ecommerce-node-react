import express from "express";
import * as userController from "../user/user.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";
const userRouter = express.Router();

userRouter
  .route("/")
  .post(protectedRoutes, userController.createUser)
  .get(userController.getAllUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .post(protectedRoutes, userController.updateUser)
  .delete(protectedRoutes, userController.deleteUser)
  .patch(protectedRoutes, userController.changeUserPassword);
export default userRouter;
