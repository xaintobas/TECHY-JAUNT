import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGO_URI) {
    console.log("MISSING CONNECTION STRING");
  }
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log("DB CONNECTED SUCCESSFULLY!!!");
  } catch (error) {
    console.log("CONNECTION FAILED!!!", error.message);
  }
};

export default connectDB;
