import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDatabase from "./config/dbConnection.js";
import userAuthRouter from "./routes/userAuthRoute.js";

const PORT = process.env.PORT || 7001;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", userAuthRouter);

app.get("/", (req, res) => {
  res.json({ message: "Auth App is running" });
});
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
});
