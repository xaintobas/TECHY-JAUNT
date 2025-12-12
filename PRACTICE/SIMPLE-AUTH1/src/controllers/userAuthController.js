import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({ message: "Please provide all details." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
    });
    await user.save();

    const mailOption = {
      from: process.env.SMTP_SENDER,
      to: user.email,
      subject: "Account Registration Success",
      text: `Your account has be created with the id ${user.email}. Your OTP is ${otp}, it will expire in ${otpExpiresAt}`,
    };

    //await transporter.sendMail(mailOption);
    return res.json({ message: "Account created. Check your mail for otp" });
  } catch (error) {
    return res.json({
      message: "User registration failed.",
      data: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ message: "Please provide all details." });
    }

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.json({ message: "Invalid Password" });
    }

    if (!existingUser.isAccountVerified) {
      return res.json({ message: "Please verify your account befor login" });
    }

    return res.json({ message: "Login Successfull" });
  } catch (error) {
    return res.json({
      message: "User Login failed.",
      data: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  try {
    if (!otp) {
      return res.json({ message: "Invalid otp" });
    }

    const user = await userModel.findOne({ otp });
    if (user.otpExpiresAt < new Date()) {
      return res.json({ message: "Expired otp" });
    }

    if (user.isAccountVerified) {
      return res.json({ message: "User already verified" });
    }

    user.otp = null;
    user.otpExpiresAt = "";
    user.isAccountVerified = true;
    await user.save();
    return res.json({ message: "User verified successfully" });
  } catch (error) {
    return res.json({
      message: "Otp verification failed.",
      data: error.message,
    });
  }
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
    return res.json({ message: "Otp has been resent to your email address." });
  } catch (error) {
    return res.json({
      message: "Otp verification failed.",
      data: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const adminUser = await userModel.findOne({ userId });
    if (adminUser !== "admin") {
      return res.json({ message: "Access Denied" });
    }

    const users = await userModel.find().select("-password -otp -otpExpiresAt");
    return res.json({ data: users });
  } catch (error) {
    return res.json({ message: "User not found" });
  }
};
