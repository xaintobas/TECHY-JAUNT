import express from "express";
import {
  getAllNotes,
  createNotes,
  deleteNote,
  updateNote,
} from "../controllers/noteControllers.js";
import isUserAuth from "../middlewares/userAuth.js";

const noteRoutes = express.Router();

noteRoutes.get("/", isUserAuth, getAllNotes);
noteRoutes.post("/create-note", isUserAuth, createNotes);
noteRoutes.delete("/:_id", deleteNote);
noteRoutes.put("/:_id", updateNote);

export default noteRoutes;
