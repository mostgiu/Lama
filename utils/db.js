import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      
      
    });
  } catch (error) {
    throw new Error(`Error connecting to database: ${error.message}`);
  }
}