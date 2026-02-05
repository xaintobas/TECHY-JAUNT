import mongoose from "mongoose";
import "dotenv/config";
const MONGODB_URI = process.env.MONGODB_URI;

const databaseConnection = async () => {
  if (!MONGODB_URI) {
    return console.log("Missing connection string!!!");
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database Connected!!!");
  } catch (error) {
    console.log(error.message);
  }
};

export default databaseConnection;
