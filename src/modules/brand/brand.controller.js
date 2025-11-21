import { brandModel } from "../../../database/models/brands.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../handlers/factory.handler.js";

export const createBrand = createOne(brandModel);
export const getAllBrands = getAll(brandModel);
export const getBrand = getOne(brandModel);
export const updateBrand = updateOne(brandModel);
export const deleteBrand = deleteOne(brandModel);
