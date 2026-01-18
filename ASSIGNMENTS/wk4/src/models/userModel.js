import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["user", "admin"],
      default: "user",
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: null,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
