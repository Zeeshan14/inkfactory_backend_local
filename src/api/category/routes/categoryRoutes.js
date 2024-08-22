const router = require("express").Router();
const {
  uploadProfilePic,
  uploadCategoryPic,
  uploadImage,
} = require("../../../utils/helpers/fileUpload");
const authJwt = require("../../../utils/helpers/authJwt");
const {
  categoryIdValidator,
  categoryCreateValidator,
  categoryUpdateValidator,
  subCategoryCreateValidator,
  subCategoryUpdateValidator,
} = require("../validators/categoryValidator");
const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  updateSubCategory,
  getSubCategory,
  deleteSubCategory,
  getSubCategoryOfCategory,
  getAllCategory,
  getAllSubCategories,
  getAllSubCategoriesForLandingScreen,
  getCategoryWithSubCategories,
  getShopProductRangeCategries,
  getAllCategoriesForAdmin,
  getAllCategoriesForProductFilter
} = require("../controllers/categoryController");

//============================ Category ==================//
router.get("/getAllCategory", getAllCategory);
router.get("/getAllCategoriesForProductFilter", getAllCategoriesForProductFilter);
router.get("/getAllCategoriesForAdmin", getAllCategoriesForAdmin);
router.get("/getShopProductRangeCategries", getShopProductRangeCategries);
router.get("/getCategoryWithSubCategories/:id", getCategoryWithSubCategories);
router.post(
  "/createCategory",
  authJwt,
  uploadImage.fields([{name:"category_image"},{name:"category_banner_image"}]),
  categoryCreateValidator,
  createCategory
);
router.put(
  "/updateCategory/:id",
  authJwt,
  uploadImage.fields([{name:"category_image"},{name:"category_banner_image"}]),
  categoryUpdateValidator,
  updateCategory
);
router.get("/getCategory/:id", categoryIdValidator, getCategory);
router.delete(
  "/deleteCategory/:id",
  authJwt,
  categoryIdValidator,
  deleteCategory
);

//============================ Sub Categories =======================//

router.post(
  "/createSubCategory",
  authJwt,
  // uploadCategoryPic.single("sub_category_image"),
  uploadImage.fields([{name:"sub_category_image"},{name:"sub_category_banner_image"}]),
  subCategoryCreateValidator,
  createSubCategory
);
router.put(
  "/updateSubCategory/:id",
  authJwt,
  // uploadCategoryPic.single("sub_category_image"),
  uploadImage.fields([{name:"sub_category_image"},{name:"sub_category_banner_image"}]),
  subCategoryUpdateValidator,
  updateSubCategory
);
router.get("/getSubCategory/:id", authJwt, categoryIdValidator, getSubCategory);
router.get("/getAllSubCategoriesForLandingScreen", getAllSubCategoriesForLandingScreen);
// router.get("/getAllSubCategories", authJwt,  getAllSubCategories);
router.get("/getAllSubCategories",  getAllSubCategories);
router.get(
  "/getSubCategoryOfCategory/:id",
  authJwt,
  categoryIdValidator,
  getSubCategoryOfCategory
);
router.delete(
  "/deleteSubCategory/:id",
  authJwt,
  categoryIdValidator,
  deleteSubCategory
);

module.exports = router;
