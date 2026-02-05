import express from "express";
import {
  signupController,
  verifyController,
  loginController,
  resendOtpController,
  forgetPasswordController,
  getAllUsersController,
  deleteUsersController,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/verify-otp", verifyController);
userRouter.post("/login", loginController);
userRouter.post("/resend-otp", resendOtpController);
userRouter.post("/forget-password", forgetPasswordController);
userRouter.get("/all-users", getAllUsersController);
userRouter.get("/:id", deleteUsersController);

export default userRouter;
