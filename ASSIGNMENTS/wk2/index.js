import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import databaseConnection from "./src/config/db.js";
import router from "./src/routes/contactRoute.js";
// import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 7001;

const app = express();

// Middelware
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/contact", router);

databaseConnection();
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
