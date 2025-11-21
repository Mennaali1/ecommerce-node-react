import joi from "joi";
export const createCategorySchema = joi.object({
  name: joi.string().min(2).max(15).required(),
});
export const getCategorySchema = joi.object({
  id: joi.string().hex().length(24).required(),
});
