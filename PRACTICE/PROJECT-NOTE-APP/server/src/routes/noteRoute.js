import { Router } from "express";
import Note from "../models/Note.js";

const router = Router();

router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ message: "All notes have been fetched", data: notes });
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note({ title, content });
  newNote.save();
  res.status(200).json({ message: "Note Created!!!", data: newNote });
});

router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
    },
    { new: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ message: "Note Not found" });
  }

  res.status(201).json({ message: "Note Updated", data: updatedNote });
});

router.delete("/:id", async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id, {
    new: true,
  });
  if (!deletedNote) {
    return res.status(404).json({ message: "Note not found!!!" });
  }

  res
    .status(201)
    .json({ message: "Note Deleted Successfully", data: deletedNote });
});

export default router;
