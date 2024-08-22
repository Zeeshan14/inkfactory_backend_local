const ApiError = require("../../../utils/error/genericError");
const services = require("../services/categoryServices");

const getCategory = async (req, res, next) => {
  const response = await services.getCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getAllCategory = async (req, res, next) => {
  const response = await services.getAllCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getAllCategoriesForAdmin = async (req, res, next) => {
  const response = await services.getAllCategoriesForAdmin(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getAllCategoriesForProductFilter = async (req, res, next) => {
  const response = await services.getAllCategoriesForProductFilter(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getShopProductRangeCategries = async (req, res, next) => {
  const response = await services.getShopProductRangeCategries(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const createCategory = async (req, res, next) => {
  const response = await services.createCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const updateCategory = async (req, res, next) => {
  const response = await services.updateCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const deleteCategory = async (req, res, next) => {
  const response = await services.deleteCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const createSubCategory = async (req, res, next) => {
  const response = await services.createSubCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const updateSubCategory = async (req, res, next) => {
  const response = await services.updateSubCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getSubCategory = async (req, res, next) => {
  const response = await services.getSubCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const deleteSubCategory = async (req, res, next) => {
  const response = await services.deleteSubCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getSubCategoryOfCategory = async (req, res, next) => {
  const response = await services.getSubCategoryOfCategory(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getAllSubCategories = async (req, res, next) => {
  const response = await services.getAllSubCategories(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getAllSubCategoriesForLandingScreen = async (req, res, next) => {
  const response = await services.getAllSubCategoriesForLandingScreen(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
const getCategoryWithSubCategories = async (req, res, next) => {
  const response = await services.getCategoryWithSubCategories(req);
  if (!response.success) {
    next(new ApiError(response.message, response.status));
  } else {
    return res.status(response.status).json({
      message: response.message,
      success: response.success,
      data: response.data,
    });
  }
};
module.exports = {
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
};
