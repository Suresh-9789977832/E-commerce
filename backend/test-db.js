import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Testing MongoDB Connection...");
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✓ Database Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("✗ Connection Error:", err.message);
    process.exit(1);
  });
