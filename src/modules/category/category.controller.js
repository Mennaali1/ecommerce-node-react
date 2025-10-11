import slugify from "slugify";
import { categoryModel } from "../../../database/models/category.model.js";
import { AppError } from "../../../utils/AppError.js";
import { catchAsyncError } from "../../../utils/catchError.js";

export const createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  let result = new categoryModel({ name, slug: slugify(name) });
  await result.save();
  res.json({ message: "success", result });
});
export const getAllCategories = catchAsyncError(async (req, res, next) => {
  let result = await categoryModel.find();
  res.json({ message: "success", result });
});
export const getCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await categoryModel.findById(id);
  !result && next(new AppError(`Category not found`));
  result && res.json({ message: "success", result });
});
export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  let result = await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !result && next(new AppError(`Category not found`));
  result && res.json({ message: "success", result });
};
export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  let result = await categoryModel.findByIdAndDelete(id);
  !result && next(new AppError(`Category not found`));
  result && res.json({ message: "success", result });
};
