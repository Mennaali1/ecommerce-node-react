import morgan from "morgan";
import { errorHandlingMiddleware } from "../../utils/errorHandlingMiddleware.js";
import authRouter from "./auth/auth.router.js";
import brandRouter from "./brand/brand.router.js";
import categoryRouter from "./category/category.router.js";
import productRouter from "./product/product.router.js";
import reviewRouter from "./review/review.router.js";
import subCategoryRouter from "./subCategory/subCategory.router.js";
import userRouter from "./user/user.router.js";
import { AppError } from "../../utils/AppError.js";
import wishlistRouter from "./wishlist/wishlist.router.js";
// import morgan from "morgan";
export function initiate(app) {
  app.use(morgan("short"));
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/subcategory", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/", (req, res, next) =>
    // res.json({ message: `cant find this route ${req.originalUrl}` })
    next(new AppError(`cant find this route ${req.originalUrl}`, 404))
  );
  app.use(errorHandlingMiddleware);
}
