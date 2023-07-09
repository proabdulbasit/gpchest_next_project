import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    combat: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["pure", "med level", "max main", "skiller"],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    prev_price: {
      type: Number,
    },
    curr_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
