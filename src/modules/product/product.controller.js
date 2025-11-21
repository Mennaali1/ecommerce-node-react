import { productModel } from "../../../database/models/product.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/factory.handler.js";

export const createProduct = createOne(productModel);
export const getAllProducts = getAll(productModel);
export const getProduct = getOne(productModel);
export const updateProduct = updateOne(productModel);
export const deleteProduct = deleteOne(productModel);
