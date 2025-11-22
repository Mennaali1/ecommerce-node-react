import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
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
    passwordChangedAt: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", function () {
  console.log(this);
  this.password = bcrypt.hashSync(this.password, 7);
});
userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 7);
  console.log(this);
});
export const userModel = mongoose.model("user", userSchema);
