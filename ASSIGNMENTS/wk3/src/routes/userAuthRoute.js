import express from "express";
import {
  signup,
  login,
  verifyOtp,
  resendOtp,
  resetPassword,
  forgetPassword,
} from "../controllers/userAuthController.js";

const userAuthRoute = new express.Router();

userAuthRoute.post("/signup", signup);
userAuthRoute.post("/login", login);
userAuthRoute.put("/verify-otp", verifyOtp);
userAuthRoute.put("/resend-otp", resendOtp);
userAuthRoute.put("/reset-password", resetPassword);
userAuthRoute.put("/froget-password", forgetPassword);

export default userAuthRoute;
