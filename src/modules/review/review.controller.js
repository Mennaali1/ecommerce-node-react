import { reviewModel } from "../../../database/models/review.model.js";
import { AppError } from "../../../utils/AppError.js";
import { catchAsyncError } from "../../../utils/catchError.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/factory.handler.js";

export const createReview = catchAsyncError(async (req, res, next) => {
  req.body.userId = req.user._id;
  let isReview = await reviewModel.findOne({
    userId: req.user._id,
    productId: req.body.productId,
  });
  console.log(isReview);
  console.log("USER FROM REQ:", req.user._id);
  console.log("PRODUCT FROM BODY:", req.body.productId);

  if (isReview) return next(new AppError("you've already made a review", 403));

  let result = new reviewModel(req.body);

  await result.save();
  res.json({ message: "success", result });
});

export const getAllReviews = getAll(reviewModel);
export const getReview = getOne(reviewModel);
export const updateReview = updateOne(reviewModel);
export const deleteReview = deleteOne(reviewModel);
