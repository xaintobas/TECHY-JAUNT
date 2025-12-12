import mongoose from "mongoose";
import "dotenv/config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTED!!!");
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED!!!");
  }
};

export default connectDatabase;
