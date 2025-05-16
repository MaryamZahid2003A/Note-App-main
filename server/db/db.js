import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://maryamzahid960:maryam123@cluster0.kuol0kb.mongodb.net/");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
