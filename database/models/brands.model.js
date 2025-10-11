import mongoose from "mongoose";
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "brand must be unique"],
      trim: true,
      required: true,
      minLength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },

    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

export const brandModel = mongoose.model("brand", brandSchema);
