import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import morgan from "morgan";
import { initiate } from "./src/modules/index.router.js";
const app = express();
const port = 3000;
dbConnection();
app.use(express.json());
app.use(express.static("uploads"));
initiate(app);
app.use(morgan("dev"));
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection shutting down");
  console.log(err.name, err.message);
  process.exit(1);
});
