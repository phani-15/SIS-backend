import mongoose from "mongoose";

const IqacSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Principal",
      "Vice Principal",
    ]
  },

  encry_password: {
    type: String,
    required: true
  },

  salt: {
    type: String
  }
});

export default mongoose.model("IQAC", IqacSchema);