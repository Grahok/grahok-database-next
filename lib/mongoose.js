import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// 🔁 Global state to track connection across hot reloads in dev
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return; // ✅ Already connected — skip
  }

  try {
    await mongoose.connect(MONGODB_URI);

    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
