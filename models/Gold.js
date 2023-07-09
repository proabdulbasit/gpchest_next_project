import mongoose from "mongoose";

const GoldSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    trade: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Gold || mongoose.model("Gold", GoldSchema);
