import express from "express";
import * as brandController from "./brand.controller.js";
import productRouter from "../product/product.router.js";
import {
  createBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from "./brand.validation.js";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../middleware/uploadFile.js";
import { allowedto, protectedRoutes } from "../auth/auth.controller.js";
const brandRouter = express.Router();

brandRouter.use("/:brandId/product", productRouter);
brandRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedto("admin"),
    uploadSingleFile("logo", "brand"),
    validation(createBrandSchema),
    brandController.createBrand
  )
  .get(brandController.getAllBrands);

brandRouter
  .route("/:id")
  .get(validation(getBrandSchema), brandController.getBrand)
  .post(
    protectedRoutes,
    allowedto("admin"),
    validation(updateBrandSchema),
    brandController.updateBrand
  )
  .delete(
    protectedRoutes,
    allowedto("admin"),
    validation(getBrandSchema),
    brandController.deleteBrand
  );
export default brandRouter;
