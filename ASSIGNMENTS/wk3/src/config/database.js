import mongoose from "mongoose";
import "dotenv/config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!!!");
  } catch (error) {
    console.log("Comnection Failed", error.message);
  }
};

export default connectDatabase;
