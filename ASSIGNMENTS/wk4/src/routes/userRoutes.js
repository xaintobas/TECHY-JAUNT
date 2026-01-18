// import express from "express";
import { Router } from "express";
import {
  signup,
  login,
  verifyOtp,
  forgetPassword,
  resetPassword,
  resendOtp,
  getAllUsers,
  getUser,
  deleteUser,
} from "../controllers/userControllers.js";
import isUserAuth from "../middlewares/userAuth.js";

// const userRoutes = new express.Router();
const userRoutes = Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.put("/verify-otp", verifyOtp);
userRoutes.put("/resend-otp", resendOtp);
userRoutes.put("/forget-password", forgetPassword);
userRoutes.put("/reset-password", resetPassword);
userRoutes.get("/get-all-users", isUserAuth, getAllUsers);
userRoutes.get("/:_id", getUser);
userRoutes.delete("/:_id", isUserAuth, deleteUser);

export default userRoutes;
