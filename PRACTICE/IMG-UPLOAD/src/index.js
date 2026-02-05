import express from "express";
import "dotenv/config";
import databaseConnection from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();
const PORT = process.env.PORT || 7001;

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);

databaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
});
