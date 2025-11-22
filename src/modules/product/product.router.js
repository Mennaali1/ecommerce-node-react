import express from "express";
import * as productController from "../product/product.controller.js";
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./product.validation.js";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../middleware/uploadFile.js";
import { allowedto, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = express.Router({ mergeParams: true });

productRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedto("admin"),
    uploadSingleFile("images", "product"),
    validation(createProductSchema),
    productController.createProduct
  )
  .get(productController.getAllProducts);

productRouter
  .route("/:id")
  .get(validation(getProductSchema), productController.getProduct)
  .post(
    protectedRoutes,
    allowedto("admin"),
    validation(updateProductSchema),
    productController.updateProduct
  )
  .delete(
    protectedRoutes,
    allowedto("admin"),
    validation(getProductSchema),
    productController.deleteProduct
  );
export default productRouter;
