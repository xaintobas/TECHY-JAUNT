import express from "express";
import "dotenv/config";
import databaseConnection from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 7001;

app.use(express.json());

databaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
  });
});
