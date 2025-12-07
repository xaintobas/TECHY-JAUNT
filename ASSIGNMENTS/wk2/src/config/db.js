import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MOGO_DB);
    console.log("DATABASE CONNECTED!!!");
  } catch (error) {
    console.log("Connection Failed!!!", error.meesage);
  }
};

export default databaseConnection;
