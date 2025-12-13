import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDatabase from "./config/database.js";
import userAuthRoute from "./routes/userAuthRoute.js";

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
