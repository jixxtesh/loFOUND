/*   const Item = require("../models/itemModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const errorHandler = require("../utils/errorHandler");

// Create a new item
exports.createItem = catchAsyncError(async (req, res, next) => {
  // If you don’t want image upload at all, remove this block
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  req.fields.creator = req.userData.userId;

  const item = await Item.create({
    ...req.fields,
    image: {
      // store local path of uploaded file instead of Cloudinary
      url: req.files.image.path,
      public_id: null,
    },
  });

  res.status(201).json({
    success: true,
    item,
  });
});

// Get all lost items
exports.getLostItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ type: "lost" });
  res.status(200).json({ items });
});

// Get all found items
exports.getFoundItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ type: "found" });
  res.status(200).json({ items });
});

// Delete an item by ID
exports.deleteItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.findOneAndRemove({ _id: req.params.id });
  if (!item) {
    return next(new errorHandler("No items found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
  });
});

// Get single item by ID
exports.getItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(new errorHandler("No items found", 404));
  }
  res.status(200).json({
    success: true,
    item,
  });
});

// Update an item by ID
exports.updateItem = catchAsyncError(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(new errorHandler("Item not found", 404));
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

// Get lost items of the logged-in user
exports.getMyLostItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ creator: req.userData.userId, type: "lost" });
  res.status(200).json({
    success: true,
    items,
  });
});

// Get found items of the logged-in user
exports.getMyFoundItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({
    creator: req.userData.userId,
    type: "found",
  });

  res.status(200).json({
    success: true,
    items,
  });
});



*/







const Item = require("../models/itemModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const cloudinary = require("../config/cloudinary");

// Create a new item
exports.createItem = catchAsyncError(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "items",
  });

  // Attach creator (logged-in user)
  const item = await Item.create({
    ...req.body,
    creator: req.userData.userId,
    image: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });

  res.status(201).json({
    success: true,
    item,
  });
});

// Get all lost items
exports.getLostItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ type: "lost" });
  res.status(200).json({ items });
});

// Get all found items
exports.getFoundItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ type: "found" });
  res.status(200).json({ items });
});

// Delete an item by ID (also remove from Cloudinary if exists)
exports.deleteItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(new errorHandler("No items found", 404));
  }

  // Delete image from Cloudinary if present
  if (item.image && item.image.public_id) {
    await cloudinary.uploader.destroy(item.image.public_id);
  }

  await item.deleteOne();

  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
  });
});

// Get single item by ID
exports.getItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(new errorHandler("No items found", 404));
  }
  res.status(200).json({
    success: true,
    item,
  });
});

// Update an item by ID
exports.updateItem = catchAsyncError(async (req, res, next) => {
  let item = await Item.findById(req.params.id);
  if (!item) {
    return next(new errorHandler("Item not found", 404));
  }

  // If a new image is uploaded, replace in Cloudinary
  if (req.file) {
    if (item.image && item.image.public_id) {
      await cloudinary.uploader.destroy(item.image.public_id);
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "items",
    });
    req.body.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

// Get lost items of the logged-in user
exports.getMyLostItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ creator: req.userData.userId, type: "lost" });
  res.status(200).json({
    success: true,
    items,
  });
});

// Get found items of the logged-in user
exports.getMyFoundItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({
    creator: req.userData.userId,
    type: "found",
  });

  res.status(200).json({
    success: true,
    items,
  });
});
