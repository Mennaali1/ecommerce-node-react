import express from "express";
import * as subCategoryController from "./subCategory.controller.js";
import {
  createsubCategorySchema,
  getsubCategorySchema,
  updatesubCategorySchema,
} from "./subCategory.validation.js";
import { validation } from "../../middleware/validation.js";
import { allowedto, protectedRoutes } from "../auth/auth.controller.js";
const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedto("admin"),
    validation(createsubCategorySchema),
    subCategoryController.createsubCategory
  )
  .get(subCategoryController.getAllsubCategories);

subCategoryRouter
  .route("/:id")
  .get(validation(getsubCategorySchema), subCategoryController.getsubCategory)
  .post(
    protectedRoutes,
    allowedto("admin"),
    validation(updatesubCategorySchema),
    subCategoryController.updatesubCategory
  )
  .delete(
    protectedRoutes,
    allowedto("admin"),
    validation(getsubCategorySchema),
    subCategoryController.deletesubCategory
  );
export default subCategoryRouter;
