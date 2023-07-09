import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5400, //expires in 1hr 30mins
  },
});

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
