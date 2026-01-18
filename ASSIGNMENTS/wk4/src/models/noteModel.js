import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("note", noteSchema);
export default Note;
