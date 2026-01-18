import User from "../models/userModel.js";
import Note from "../models/noteModel.js";

export const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    const currentUser = await User.findById(userId);

    let notes;
    if (currentUser.role === "admin") {
      notes = await Note.find();
    } else {
      notes = await Note.find({ userId });
    }

    if (!notes || notes.length === 0) {
      return res.status(200).json({
        message: "You have not created any note. Please create a new note!!!",
      });
    }

    return res.status(200).json({
      message: "Notes retrieved successfully!!!",
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, content } = req.body;
    const note = await Note.create({ userId, title, content });
    return res.status(201).json({ message: "Note Created!!!", data: note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
