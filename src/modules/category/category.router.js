import express from "express";
import * as categoryController from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.router.js";
import {
  createCategorySchema,
  getCategorySchema,
} from "./category.validation.js";
import { validation } from "../../middleware/validation.js";
const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subcategory", subCategoryRouter);
categoryRouter
  .route("/")
  .post(validation(createCategorySchema), categoryController.createCategory)
  .get(categoryController.getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(getCategorySchema), categoryController.getCategory)
  .post(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);
export default categoryRouter;
