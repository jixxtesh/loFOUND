const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

require("dotenv").config();   //newly added


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});





// 🔐 Create JWT token

userSchema.methods.getJWTToken = function () {
  const secret = process.env.JWT_SECRET;
  console.log("JWT inside model:", secret);  // 👈 add this line for debugging

  if (!secret) {
    throw new Error("JWT_SECRET is missing in .env file");
  }

  return jwt.sign({ id: this._id.toString() }, secret, {
    expiresIn: "7d",
  });
};
















 /*userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};*/








// 🔐 Compare entered password with stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
