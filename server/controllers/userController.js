const User = require("../models/userModel.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// const cloudinary = require("../utils/cloudinaryConfig.js");

// ✅ REGISTER USER
const registerUser = catchAsyncError(async (req, res, next) => {
  try {
    console.log("Incoming register request");

    const { name, email, password, phone } = req.body;
    const avatar = req.file;

    console.log("BODY:", req.body);
console.log("FILE:", req.file);


   // if (!name || !email || !password || !phone || !avatar) {
    //  console.log("Missing fields");
     // return res.status(400).json({ error: "All fields are required" });
   // }

   /* console.log("Uploading avatar to Cloudinary...");
    const result = await cloudinary.uploader.upload(avatar.path, {
      folder: "loFOUND",
    });

    console.log("Cloudinary upload complete:", result.secure_url);*/

    const user = await User.create({
      name,
      email,
      password,
      phone,
      /*      avatar: {
        url: result.secure_url,
        public_id: result.public_id,
      },     */
    });

    console.log("User created:", user.email);

    const token = user.getJWTToken();
    res.status(201).json({ userId: user.id, email: user.email, token });
  } catch (error) {
    console.error("❌ Registration error:", error);

    // ✅ Handle duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different one or login.",
      });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ LOGIN USER
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJWTToken();
  res.status(201).json({ userId: user.id, email, token });
});

// ✅ LOGOUT
const logout = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// ✅ FORGOT PASSWORD
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("No user found with the mail", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.body.url}/${resetToken}`;
  const message = `Your reset password link is ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "loFOUND Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Reset password email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// ✅ RESET PASSWORD
const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password link is invalid or expired", 400)
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and ConfirmPassword doesn't match", 400)
    );
  }

  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const token = user.getJWTToken();
  res.status(201).json({ userId: user.id, email: user.email, token });
});

// ✅ GET MY DETAILS
const getMyDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.userData.userId);
  res.status(200).json({
    success: true,
    user,
  });
});

// ✅ GET USER DETAILS BY ID
const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// ✅ UPDATE PASSWORD
const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.userData.userId).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and ConfirmPassword doesn't match", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = user.getJWTToken();
  res.status(201).json({ userId: user.id, email: user.email, token });
});

// ✅ UPDATE PROFILE
const updateProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.userData.userId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// ✅ EXPORT ALL CONTROLLER FUNCTIONS
module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getMyDetails,
  getUserDetails,
  updatePassword,
  updateProfile,
};
