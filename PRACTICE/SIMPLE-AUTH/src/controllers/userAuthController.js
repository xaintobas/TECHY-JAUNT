import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required!!!" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email have been used by another user",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      signed: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOptions = {
      from: process.env.SMTP_SENDER,
      to: user.email,
      subject: "Registration Mail",
      text: `Account has been created with the email: ${user.email}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Registration Successfull" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
