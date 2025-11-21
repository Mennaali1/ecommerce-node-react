import express from "express";
import * as productController from "../product/product.controller.js";

const productRouter = express.Router({ mergeParams: true });

productRouter
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);

productRouter
  .route("/:id")
  .get(productController.getProduct)
  .post(productController.updateProduct)
  .delete(productController.deleteProduct);
export default productRouter;
