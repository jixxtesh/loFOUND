/*





const express = require("express");
const { createItem, getLostItems, getFoundItems, deleteItem, updateItem ,getItem, getMyLostItems, getMyFoundItems} = require("../controllers/itemController");
const {isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();




const expressFormidable =require("express-formidable");

router.route("/item/new").post(isAuthenticatedUser,expressFormidable({maxFieldsSize:5*1024*1024}),createItem);
router.route("/items/lost").get(getLostItems);
router.route("/items/found").get(getFoundItems);
router
  .route("/item/:id").get(getItem)
  .put(isAuthenticatedUser,  updateItem)
  .delete(isAuthenticatedUser, deleteItem);
router.route("/items/me/lost").get(isAuthenticatedUser,getMyLostItems);
router.route("/items/me/found").get(isAuthenticatedUser,getMyFoundItems);
module.exports = router; 



*/





const express = require("express");
const {
  createItem,
  getLostItems,
  getFoundItems,
  deleteItem,
  updateItem,
  getItem,
  getMyLostItems,
  getMyFoundItems,
} = require("../controllers/itemController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// ✅ Multer + Cloudinary setup
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Store uploads directly in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "loFOUND_items", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// ✅ Routes
router.route("/item/new").post(
  isAuthenticatedUser,
  upload.single("image"), // 👈 frontend field name must be "image"
  createItem
);

router.route("/items/lost").get(getLostItems);
router.route("/items/found").get(getFoundItems);

router
  .route("/item/:id")
  .get(getItem)
  .put(isAuthenticatedUser, updateItem)
  .delete(isAuthenticatedUser, deleteItem);

router.route("/items/me/lost").get(isAuthenticatedUser, getMyLostItems);
router.route("/items/me/found").get(isAuthenticatedUser, getMyFoundItems);

module.exports = router;
