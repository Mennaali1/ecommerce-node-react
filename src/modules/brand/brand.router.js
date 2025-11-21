import express from "express";
import * as brandController from "./brand.controller.js";
import productRouter from "../product/product.router.js";
const brandRouter = express.Router();

brandRouter.use("/:brandId/product", productRouter);
brandRouter
  .route("/")
  .post(brandController.createBrand)
  .get(brandController.getAllBrands);

brandRouter
  .route("/:id")
  .get(brandController.getBrand)
  .post(brandController.updateBrand)
  .delete(brandController.deleteBrand);
export default brandRouter;
