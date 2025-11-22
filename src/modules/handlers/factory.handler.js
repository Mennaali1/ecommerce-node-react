import { AppError } from "../../../utils/AppError.js";
import { catchAsyncError } from "../../../utils/catchError.js";
import slugify from "slugify";
import ApiFeatures from "../../../utils/ApiFeatures.js";
import { userModel } from "../../../database/models/user.model.js";
import { reviewModel } from "../../../database/models/review.model.js";

export const createOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    if (model == userModel) {
      let user = await model.findOne({ email: req.body.email });
      if (user) {
        return next(new AppError("email exisits", 400));
      }
    }
    if (model !== reviewModel) {
      req.body.slug = slugify(req.body.name);
      req.body.image = req.file.filename;
    }

    req.body.user = req.user._id;
    let isReview = await model.findOne({
      userId: req.user._id,
      product: req.body.productId,
    });
    console.log("USER FROM REQ:", req.user._id);
    console.log("PRODUCT FROM BODY:", req.body.productId);

    if (isReview)
      return next(new AppError("you've already made a review", 403));

    let result = new model(req.body);

    await result.save();
    res.json({ message: "success", result });
  });
};
export const getAll = (model) => {
  return catchAsyncError(async (req, res, next) => {
    let filter = {};
    if (req.params.brandId) filter.brandId = req.params.brandId;
    if (req.params.categoryId) filter.categoryId = req.params.categoryId;
    let apiFeatures = new ApiFeatures(model.find(), req.query)
      .filtering()
      .search()
      .sorting()
      .fields()
      .pagination();
    let result = await apiFeatures.mongooseQuery.exec();
    res.json({ message: "success", result });
  });
};

export const getOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await model.findById(id);
    !result && next(new AppError(`product not found`));
    result && res.json({ message: "success", result });
  });
};

export const updateOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.name) req.body.slug = slugify(req.body.name);

    let result = await model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !result && next(new AppError(`product not found`));
    result && res.json({ message: "success update", result });
  });
};

export const deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await model.findByIdAndDelete(id);
    !result && next(new AppError(`Item not found`));
    result && res.json({ message: "success", result });
  });
};
export const changePassword = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    req.body.passwordChangedAt = Date.now();
    if (req.body.name) req.body.slug = slugify(req.body.name);

    let result = await model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    !result && next(new AppError(`product not found`));
    result && res.json({ message: "success update", result });
  });
};
