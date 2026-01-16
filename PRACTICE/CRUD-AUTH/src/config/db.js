import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDatabase = async () => {
  if (!MONGODB_URI) {
    console.log("DB Connection string is missing");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected!!!");
  } catch (error) {
    console.log("DB Connection failed", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
