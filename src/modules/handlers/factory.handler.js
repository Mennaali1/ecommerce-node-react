import { AppError } from "../../../utils/AppError.js";
import { catchAsyncError } from "../../../utils/catchError.js";
import slugify from "slugify";
import QueryString from "qs";
import ApiFeatures from "../../../utils/ApiFeatures.js";
export const deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await model.findByIdAndDelete(id);
    !result && next(new AppError(`Item not found`));
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

export const getOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await model.findById(id);
    !result && next(new AppError(`product not found`));
    result && res.json({ message: "success", result });
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

export const createOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);

    let result = new model(req.body);
    await result.save();
    res.json({ message: "success", result });
  });
};
