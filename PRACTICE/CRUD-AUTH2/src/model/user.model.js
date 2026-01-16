import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      required: "true",
      type: String,
    },
    email: {
      required: "true",
      type: String,
      unique: true,
    },
    password: {
      required: "true",
      type: String,
    },
    role: {
      required: "true",
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp: {
      type: Number,
    },
    otpExpiresAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("taskUser", userSchema);
export default User;
