import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postBody: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("post", postSchema);

export default Post;
