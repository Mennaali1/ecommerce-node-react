import express from "express";
import * as subCategoryController from "./subCategory.controller.js";
const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(subCategoryController.createsubCategory)
  .get(subCategoryController.getAllsubCategories);

subCategoryRouter
  .route("/:id")
  .get(subCategoryController.getsubCategory)
  .post(subCategoryController.updatesubCategory)
  .delete(subCategoryController.deletesubCategory);
export default subCategoryRouter;
