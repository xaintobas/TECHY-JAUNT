import express from "express";
import {
  createPostController,
  editPostController,
  deletePostController,
  getAllPostController,
} from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post("/create-post", createPostController);
postRouter.post("/:id", editPostController);
postRouter.post("/:id", deletePostController);
postRouter.post("/view-posts", getAllPostController);

export default postRouter;
