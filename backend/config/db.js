const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Missing MONGO_URI/MONGODB_URI in environment");
    }

    cachedConnection = mongoose.connect(uri);
    const conn = await cachedConnection;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    cachedConnection = null;
    console.error("Database connection error:", error.message);
    throw error;
  }
};

module.exports = connectDB;
