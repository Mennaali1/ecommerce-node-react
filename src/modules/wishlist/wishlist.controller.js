import { reviewModel } from "../../../database/models/review.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../../utils/AppError.js";
import { catchAsyncError } from "../../../utils/catchError.js";

export const addToWishList = catchAsyncError(async (req, res, next) => {
  const { product } = req.body;

  const result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: product } },
    {
      new: true,
    }
  );
  !result && next(new AppError("product not found", 404));
  result && res.json({ message: "success", result });
});
export const removeFromWishList = catchAsyncError(async (req, res, next) => {
  const { product } = req.body;

  const result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: product } },
    {
      new: true,
    }
  );
  !result && next(new AppError("product not found", 404));
  result && res.json({ message: "success", result });
});
export const getAllWishlist = catchAsyncError(async (req, res, next) => {
  const result = await userModel
    .findOne({ _id: req.user._id })
    .populate("wishlist");
  !result && next(new AppError("product not found", 404));
  result && res.json({ message: "success", result: result.wishlist });
});
