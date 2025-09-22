const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getMyDetails,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/userController.js");

const { isAuthenticatedUser } = require("../middleware/auth.js");
const upload = require("../middleware/upload"); // ✅ Multer middleware

const router = express.Router();

// ✅ Register route with image upload
router.post("/register", upload.single("avatar"), registerUser);

// ✅ Auth and user routes
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/user/:id", getUserDetails);
router.get("/me", isAuthenticatedUser, getMyDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);

// ✅ Must export ONLY the router
module.exports = router;
