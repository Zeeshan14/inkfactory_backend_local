const router = require("express").Router();
const { uploadImage } = require("../../../utils/helpers/fileUpload");
const authJwt = require("../../../utils/helpers/authJwt");
// const {
//   categoryIdValidator,
//   categoryCreateValidator,
//   categoryUpdateValidator,
//   subCategoryCreateValidator,
//   subCategoryUpdateValidator,
// } = require("../validators/categoryValidator");
const {
  blogCreate,
  blogDelete,
  blogUpdate,
  getAllBlogs,
  getBlogDetail,
} = require("../controllers/blogController");

//============================ Category ==================//
router.get("/getAllBlogs", getAllBlogs);
router.post(
  "/blogCreate",
  authJwt,
  uploadImage.single("blog_image"),
  //   categoryCreateValidator,
  blogCreate
);
router.put(
  "/blogUpdate/:id",
  authJwt,
  uploadImage.single("blog_image"),
  //   categoryUpdateValidator,
  blogUpdate
);
router.get(
  "/getBlogDetail/:id",
  // categoryIdValidator,
  getBlogDetail
);
router.delete(
  "/blogDelete/:id",
  authJwt,
  //   categoryIdValidator,
  blogDelete
);

module.exports = router;
