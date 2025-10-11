import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "category must be unique"],
      trim: true,
      required: true,
      minLength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },

    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export const categoryModel = mongoose.model("category", categorySchema);
