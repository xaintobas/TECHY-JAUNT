import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!!!" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist!!!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      otp,
      otpExpiry,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!!!" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!!!" });
    }

    const matchPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect password!!!" });
    }

    if (!existingUser.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your account before login!!!" });
    }

    const token = await jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .json({ message: "User logged in successful!!!", data: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required!!!" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!!!" });
    }

    if (existingUser.isVerified) {
      return res.status(400).json({ message: "User already verified!!!" });
    }

    if (Date.now() > existingUser.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired!!!" });
    }

    if (existingUser.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP!!!" });
    }

    existingUser.otp = null;
    existingUser.otpExpiry = null;
    existingUser.isVerified = true;
    await existingUser.save();

    return res
      .status(200)
      .json({ message: "User verification successful!!!", data: existingUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Please enter your email address!!!" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!!!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    existingUser.otp = otp;
    existingUser.otpExpiry = otpExpiry;

    await existingUser.save();
    res.status(200).json({
      message: "Password reset OTP has been sent to your email address!!!",
      data: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmNewPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: "All fields are required!!!" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Password does not match!!!" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!!!" });
    }

    if (Date.now() > existingUser.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired!!!" });
    }

    if (existingUser.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP!!!" });
    }

    const hashPassword = await bcryptjs.hash(newPassword, 10);

    existingUser.otp = null;
    existingUser.otpExpiry = null;
    existingUser.password = hashPassword;

    await existingUser.save();
    res.status(200).json({
      message:
        "Password updated successfully. Login now with your new password!!!",
      data: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, data: existingUser });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Please enter your email address!!!" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!!!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    existingUser.otp = otp;
    existingUser.otpExpiry = otpExpiry;

    await existingUser.save();
    res.status(200).json({
      message: "OTP has been sent to your email address!!!",
      data: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, data: existingUser });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { userId } = req.user;
    const adminUser = await User.findById(userId);
    if (adminUser.role !== "admin") {
      return res.status(401).json({ message: "Access Denied!!!" });
    }
    const users = await User.find().select(
      "-password -isVerified -otp -otpExpiry -createdAt -updatedAt -__v"
    );
    return res.status(200).json({ message: "See all users", data: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params).select(
      "-password -isVerified -otp -otpExpiry -createdAt -updatedAt -__v"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const adminUser = await User.findById(userId);
    if (adminUser.role !== "admin") {
      return res.status(401).json({ message: "Access Denied!!!" });
    }
    const userDeleted = await User.findByIdAndDelete(req.params);
    return res.status(200).json({ data: userDeleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
