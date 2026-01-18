import mongoose from "mongoose";
import "dotenv/config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!!!");
  } catch (error) {
    console.log("Database Connection Failed!!!", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
