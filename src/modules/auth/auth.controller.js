import { catchAsyncError } from "../../../utils/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../../utils/AppError.js";
export const signup = catchAsyncError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) return next(new AppError("Email already exists", 400));
  const user = new userModel(req.body);
  await user.save();
  res.json({ message: "success", user });
});
export const signin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  let isFound = await userModel.findOne({ email });
  if (!isFound) res.json({ message: "email doesn't exist" });
  const match = await bcrypt.compare(password, isFound.password);
  if (isFound && match) {
    let token = jwt.sign(
      { name: isFound.name, userId: isFound._id, role: isFound.role },
      "mennaaly"
    );
    return res.json({ message: "success", token: token });
  }
  next(new AppError("incorrect email or password", 401));
});

export const protectedRoutes = catchAsyncError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("you're not authorized to access", 401));
  let decoded = jwt.verify(token, "mennaaly");
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("user not found", 401));
  if (user.passwordChangedAt) {
    let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (changePasswordDate > decoded.iat) return new AppError("invalid user");
  }
  req.user = user;
  next();
});

export const allowedto = (...role) => {
  return catchAsyncError(async (req, res, next) => {
    if (!role.includes(req.user.role))
      return next(new AppError("you're not authorized to access", 401));
    next();
  });
};
