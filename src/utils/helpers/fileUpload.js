const multer = require("multer");
const path = require("path");
const ApiError = require("../error/genericError");
const messages = require("../constants/messages");
const storageDestination = (req, file, cb) => {
  cb(null, "uploads/");
};
const filter = (req, file, cb) => {
  const mimeTypeArray = ["image/png", "image/jpg", "image/jpeg"];
  if (!mimeTypeArray.includes(file.mimetype)) {
    return cb(new ApiError(messages.UPLOAD_IMAGE, 400));
  } else {
    return cb(null, true);
  }
};
const fileName = (req, file, cb) => {
  const imageName = Date.now();
  const ext = path.extname(file.originalname);
  const fullName = imageName +"-"+ file.originalname;
  cb(null, fullName);
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/userProfile/");
  },
  filename: function (req, file, cb) {
    const imageName = Date.now();
    const ext = path.extname(file.originalname);
    const fullName = imageName + ext;
    cb(null, fullName);
  },
});

const uploadProfilePic = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const mimeTypeArray = ["image/png", "image/jpg", "image/jpeg"];
    if (!mimeTypeArray.includes(file.mimetype)) {
      cb(new ApiError(messages.UPLOAD_IMAGE, 400));
    } else {
      return cb(null, true);
    }
  },
});

//==============================product=======================//
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products/");
  },
  filename: function (req, file, cb) {
    const imageName = Date.now();
    const ext = path.extname(file.originalname);
    const fullName = imageName + ext;
    cb(null, fullName);
  },
});

const uploadProductPic = multer({
  storage: productStorage,
  fileFilter: function (req, file, cb) {
    const mimeTypeArray = ["image/png", "image/jpg", "image/jpeg"];
    if (!mimeTypeArray.includes(file.mimetype)) {
      cb(new ApiError(messages.UPLOAD_IMAGE, 400));
    } else {
      return cb(null, true);
    }
  },
});

//======================== Category =================================//
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories/");
  },
  filename: function (req, file, cb) {
    const imageName = Date.now();
    const ext = path.extname(file.originalname);
    const fullName = imageName + ext;
    cb(null, fullName);
  },
});
const uploadCategoryPic = multer({
  storage: categoryStorage,
  fileFilter: function (req, file, cb) {
    const mimeTypeArray = ["image/png", "image/jpg", "image/jpeg"];
    if (!mimeTypeArray.includes(file.mimetype)) {
      cb(new ApiError(messages.UPLOAD_IMAGE, 400));
    } else {
      return cb(null, true);
    }
  },
});

//===================================================Storage==========================//
const genericStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    storageDestination(req, file, cb);
  },
  filename: function (req, file, cb) {
    fileName(req, file, cb);
  },
});
const uploadImage = multer({
  storage: genericStorage,
  fileFilter: function (req, file, cb) {
    filter(req, file, cb);
  },
});
const uploadMultipleImages = multer({
  storage: genericStorage,
  fileFilter: function (req, file, cb) {
    filter(req, file, cb);
  },
});
module.exports = {
  uploadProfilePic,
  uploadProductPic,
  uploadCategoryPic,
  uploadImage,
  uploadMultipleImages,
};
