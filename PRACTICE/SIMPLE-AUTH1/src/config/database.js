import mongoose from "mongoose";
import "dotenv/config";

const connectDatabase = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Database connection Failed", error.message);
  }
};

export default connectDatabase;
