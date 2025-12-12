import { Router } from "express";
import isAuth from "../middleware/userAutMiddleware.js";
import {
  signup,
  login,
  verifyOtp,
  resendOtp,
  getAllUser,
} from "../controllers/userAuthController.js";

const userAuthRoute = new Router();

userAuthRoute.post("/signup", signup);
userAuthRoute.post("/login", login);
userAuthRoute.get("/get", isAuth, getAllUser);
userAuthRoute.put("/verify-otp", verifyOtp);
userAuthRoute.put("/resend-otp", resendOtp);

export default userAuthRoute;
