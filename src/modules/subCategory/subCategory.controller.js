import slugify from "slugify";
import { AppError } from "../../../utils/AppError.js";
import { catchAsyncError } from "../../../utils/catchError.js";
import { subCategoryModel } from "../../../database/models/subcategory.model.js";
import { createOne, deleteOne } from "../handlers/factory.handler.js";

export const createsubCategory = createOne(subCategoryModel);
export const getAllsubCategories = catchAsyncError(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { categoryId: req.params.categoryId };
  }
  let result = await subCategoryModel.find(filter);
  res.json({ message: "success", result });
});
export const getsubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await subCategoryModel.findById(id);
  !result && next(new AppError(`subCategory not found`));
  result && res.json({ message: "success", result });
});
export const updatesubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  let result = await subCategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !result && next(new AppError(`subCategory not found`));
  result && res.json({ message: "success", result });
};
export const deletesubCategory = deleteOne(subCategoryModel);
