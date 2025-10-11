import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "user must be unique"],
      trim: true,
      required: true,
      minLength: 2,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxlength: 20,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: [String],
    phone: {
      type: String,
      required: true,
      min: 11,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
