import express from "express";
import categoryRouter from "./src/modules/category/category.router.js";
import { dbConnection } from "./database/dbConnection.js";
import { AppError } from "./utils/AppError.js";
import { errorHandlingMiddleware } from "./utils/errorHandlingMiddleware.js";
const app = express();
const port = 3000;
dbConnection();
app.use(express.json());

app.use("/api/v1/category", categoryRouter);
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
