import express from "express";

import connectDatabase from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 7001;

app.use(express.json());

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
});
