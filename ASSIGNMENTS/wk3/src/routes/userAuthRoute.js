import express from "express";
import {
  signup,
  login,
  verifyOtp,
  resendOtp,
  resetPassword,
  forgetPassword,
  getAllUsers,
} from "../controllers/userAuthController.js";
import { isUserAuthMiddleware } from "../middleware/userAuthMiddleware.js";

const userAuthRoute = new express.Router();

userAuthRoute.post("/signup", signup);
userAuthRoute.post("/login", login);
userAuthRoute.put("/verify-otp", verifyOtp);
userAuthRoute.put("/resend-otp", resendOtp);
userAuthRoute.put("/reset-password", resetPassword);
userAuthRoute.put("/froget-password", forgetPassword);
userAuthRoute.get("/get-all-users", isUserAuthMiddleware, getAllUsers);

export default userAuthRoute;
