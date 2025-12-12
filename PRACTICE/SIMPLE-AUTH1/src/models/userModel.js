import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAccountVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiresAt: { type: Date, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const userModel = mongoose.model("test1user", userSchema);

export default userModel;
