import express from "express";
import categoryRouter from "./src/modules/category/category.router.js";
import subCategoryRouter from "./src/modules/subCategory/subCategory.router.js";
import { dbConnection } from "./database/dbConnection.js";
import { AppError } from "./utils/AppError.js";
import { errorHandlingMiddleware } from "./utils/errorHandlingMiddleware.js";
import morgan from "morgan";
import brandRouter from "./src/modules/brand/brand.router.js";
import productRouter from "./src/modules/product/product.router.js";
const app = express();
const port = 3000;
dbConnection();
app.use(express.json());
app.use(morgan("short"));
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);
app.use("/", (req, res, next) =>
  // res.json({ message: `cant find this route ${req.originalUrl}` })
  next(new AppError(`cant find this route ${req.originalUrl}`, 404))
);
app.use(errorHandlingMiddleware);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection shutting down");
  console.log(err.name, err.message);
  process.exit(1);
});
