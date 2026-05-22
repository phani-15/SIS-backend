import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  role: { type: String, default: "ADMIN" },
  encry_password: { type: String, required: true },
  salt: String
});

export default mongoose.model("Admin", adminSchema);