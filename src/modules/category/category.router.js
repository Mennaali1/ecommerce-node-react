import express from "express";
import * as categoryController from "./category.controller.js";
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategories);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategory)
  .post(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);
export default categoryRouter;
