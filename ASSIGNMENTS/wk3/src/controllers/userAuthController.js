import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import transporter from "../config/nodemailer.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({
        message: "Please provide all info. All the fields are required.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User already exist!!!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });
    await user.save();
    const mailOption = {
      from: process.env.SMTP_SENDER,
      to: user.email,
      subject: "Account Creation",
      text: `Account created successfully. with the eamil ${user.email} and your otp is ${otp}`,
    };
    try {
      await transporter.sendMail(mailOption);
      return res.json({ message: "User created!!!" });
    } catch (error) {
      return res.json({ data: error.message });
    }
  } catch (error) {
    return res.json({ message: "Registration Failed!!", data: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  try {
    if (!otp) {
      return res.json({ message: "Please enter an OTP" });
    }
    const user = await User.findOne({ otp });
    if (!user) {
      return res.json({ message: "Invalid OTP!!!" });
    }
    if (user.isVerified) {
      return res.json({ message: "You are already verified" });
    }
    if (user.otpExpiry < new Date()) {
      return res.json({
        message: "OTP has expired, you can request a new one",
      });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = "";
    await user.save();
    return res.json({
      message: "You have been verified. Now you can login",
    });
  } catch (error) {
    return res.json({ message: "Unable to Verify user", data: error.message });
  }
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.json({
        message: "Please provide your email.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found!!",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    return res.json({
      message: "A new OTP has been sent to your email",
    });
  } catch (error) {
    return res.json({ message: "Unable to send new OTP", data: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        message: "Please provide all info. All the fields are required.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: "User does not exist",
      });
    }
    if (!existingUser.isVerified) {
      return res.json({
        message: "Please verify you account first you login!!!.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.json({
        message: "Invalid password!.",
      });
    }
    return res.json({ message: "Login Successful......." });
  } catch (error) {
    return res.json({ message: "Login Failed!!", data: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { otp, newPassword } = req.body;
  try {
    if (!otp || !newPassword) {
      return res.json({
        message: "Please provide all info. All the fields are required.",
      });
    }
    const user = await User.findOne({ otp });
    if (!user) {
      return res.json({
        message: "Invalid OTP",
      });
    }
    if (user.otpExpiry < new Date()) {
      return res.json({
        message: "Expired OTP. Please request another!!!",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({ message: "User password updated...." });
  } catch (error) {
    return res.json({
      message: "Password Update Failed!!",
      data: error.message,
    });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.json({
        message: "Please provide you email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    return res.json({
      message: "A new OTP has been sent to your email",
    });
  } catch (error) {
    return res.json({ message: "Unable to request a new OTP!!" });
  }
};
