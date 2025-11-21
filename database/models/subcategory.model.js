import mongoose from "mongoose";
const subcategorySchema = new mongoose.Schema(
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

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  { timestamps: true }
);

export const subCategoryModel = mongoose.model(
  "subcategory",
  subcategorySchema
);
