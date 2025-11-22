import joi from "joi";
export const createProductSchema = joi.object({
  name: joi.string().min(2).max(50).required(),
  descriptin: joi.string().min(2).max(50).required(),
  quantity: joi.number().required(),
  price: joi.number().required(),
});
export const getProductSchema = joi.object({
  id: joi.string().hex().length(24).required(),
});
export const updateProductSchema = joi.object({
  id: joi.string().hex().length(24).required(),
  name: joi.string().min(2).max(50).required(),
});
