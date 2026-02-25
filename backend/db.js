import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected successfully to DB");
  } catch (err) {
    console.log("Failed to connect with DB\n", err);
  }
};

export default connectDB;
