import express from "express";
import "dotenv/config";
import morgan from "morgan";
import userAuthRoute from "./routes/userAuthRoute.js";

import connectDatabase from "./config/database.js";

const app = express();

const PORT = process.env.PORT || 7001;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", userAuthRoute);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
});
