import mongoose from "mongoose";
import { userModel } from "./user.model";
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 120,
    },
  },
  { timestamps: true }
);

export const reviewModel = mongoose.model("review", reviewSchema);
