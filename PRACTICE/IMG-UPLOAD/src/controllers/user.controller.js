import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!!!" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 20 * 60 * 1000);
    const user = await User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });
    await user.save();
    return res
      .status(200)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
export const verifyController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!!!" });
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
export const loginController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!!!" });
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
export const resendOtpController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!!!" });
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
export const forgetPasswordController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!!!" });
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
export const getAllUsersController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!!!" });
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
export const deleteUsersController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required!!!" });
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
