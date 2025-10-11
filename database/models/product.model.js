import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "product must be unique"],
      trim: true,
      required: true,
      minLength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxlength: 300,
    },

    imgCover: {
      type: String,
    },
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscound: {
      type: Number,
      min: 0,
    },
    avgRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    rateCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true],
      min: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
