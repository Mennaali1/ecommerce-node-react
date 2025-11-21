import { categoryModel } from "../../../database/models/category.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/factory.handler.js";

export const createCategory = createOne(categoryModel);
export const getAllCategories = getAll(categoryModel);
export const getCategory = getOne(categoryModel);
export const updateCategory = updateOne(categoryModel);
export const deleteCategory = deleteOne(categoryModel);
