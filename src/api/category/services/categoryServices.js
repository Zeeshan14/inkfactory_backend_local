const {
  getCategory,
  getAllCategory,
  getSubCategory,
  getSubCategoryOfCategory,
  getAllSubCategories,
  getAllSubCategoriesForLandingScreen,
  getCategoryWithSubCategories,
  getShopProductRangeCategries,
  getAllCategoriesForAdmin,
  getAllCategoriesForProductFilter
} = require("./categoryListServices");
const {
  createCategory,
  createSubCategory,
} = require("./categoryCreateServices");
const {
  updateCategory,
  deleteCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("./categoryUpdateServices");

module.exports = {
  getCategory,
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  updateSubCategory,
  getSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryOfCategory,
  getAllSubCategoriesForLandingScreen,
  getCategoryWithSubCategories,
  getShopProductRangeCategries,
  getAllCategoriesForAdmin,
  getAllCategoriesForProductFilter
};
