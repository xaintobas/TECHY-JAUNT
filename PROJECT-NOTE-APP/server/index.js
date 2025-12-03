import express from "express";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
import router from "./src/routes/noteRoute.js";

dotenv.config();

const PORT = process.env.PORT || 7001;

const app = express(); // Create an express app

// Middleware
app.use(express.json());

app.use("/api/notes", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
});
