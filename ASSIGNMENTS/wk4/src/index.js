import express from "express";
import morgan from "morgan";
import connectDatabase from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import "dotenv/config";
import noteRoutes from "./routes/noteRoutes.js";
const app = express();

const PORT = process.env.PORT || 7001;

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth/", userRoutes);
app.use("/notes", noteRoutes);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
});
