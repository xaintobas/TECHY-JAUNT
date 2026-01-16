import mongoose from "mongoose";
import "dotenv/config";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(`DB Connection Failed. ${error.message}`);
  }
};

export default databaseConnection;
