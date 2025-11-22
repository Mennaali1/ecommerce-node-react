import express from "express";
import * as categoryController from "./category.controller.js";
import subCategoryRouter from "../subCategory/subCategory.router.js";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../middleware/uploadFile.js";
import { allowedto, protectedRoutes } from "../auth/auth.controller.js";
const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subcategory", subCategoryRouter);
categoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedto("admin"),
    uploadSingleFile("image", "category"),
    validation(createCategorySchema),
    categoryController.createCategory
  )
  .get(categoryController.getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(getCategorySchema), categoryController.getCategory)
  .post(
    protectedRoutes,
    allowedto("admin"),
    validation(updateCategorySchema),
    categoryController.updateCategory
  )
  .delete(
    protectedRoutes,
    allowedto("admin"),
    validation(getCategorySchema),
    categoryController.deleteCategory
  );
export default categoryRouter;
