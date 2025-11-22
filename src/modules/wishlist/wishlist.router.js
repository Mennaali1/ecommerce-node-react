import express from "express";
import { allowedto, protectedRoutes } from "../auth/auth.controller.js";
const wishlistRouter = express.Router();
import * as wishlistController from "./wishlist.controller.js";

wishlistRouter
  .route("/")

  .patch(
    protectedRoutes,
    allowedto("user"),

    wishlistController.addToWishList
  )
  .delete(
    protectedRoutes,
    allowedto("user"),

    wishlistController.removeFromWishList
  )
  .get(
    protectedRoutes,
    allowedto("user"),

    wishlistController.getAllWishlist
  );

export default wishlistRouter;
