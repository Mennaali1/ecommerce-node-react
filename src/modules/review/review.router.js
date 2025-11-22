import express from "express";
import { uploadSingleFile } from "../../middleware/uploadFile.js";
import { allowedto, protectedRoutes } from "../auth/auth.controller.js";
const reviewRouter = express.Router();
import * as reviewController from "./review.controller.js";
reviewRouter
  .route("/")
  .post(protectedRoutes, allowedto("user"), reviewController.createReview)
  .get(reviewController.getAllReviews);

reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .post(
    protectedRoutes,
    allowedto("user"),

    reviewController.updateReview
  )
  .delete(
    protectedRoutes,
    allowedto("admin", "user"),
    reviewController.deleteReview
  );
export default reviewRouter;
