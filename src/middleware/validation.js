import { AppError } from "../../utils/AppError.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const inputs = { ...req.body, ...req.params, ...req.query };

    let { error } = schema.validate(inputs, {
      abortEarly: false,
    });
    if (error) {
      let errors = error.details.map((details) => details.message);
      next(new AppError(`${errors}`, 400));
    } else {
      next();
    }
  };
};
