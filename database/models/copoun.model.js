import mongoose from "mongoose";
const copounSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    discount: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },

    expiryDate: {
      type: date,
      required: true,
    },
  },
  { timestamps: true }
);

export const copounModel = mongoose.model("copoun", copounSchema);
