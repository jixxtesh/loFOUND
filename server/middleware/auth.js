const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {

    console.log("Incoming headers:", req.headers);

    const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  const error = new ErrorHandler("Authentication failed!", 403);
  return next(error);
}

const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.id };
    next();
  } catch (err) {
    const error = new ErrorHandler("Authentication failed!", 403);
    return next(error);
  }
});
