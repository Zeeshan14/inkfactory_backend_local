const ApiError = require("../../../utils/error/genericError");
const services = require("../services/blogServices");

const blogCreate = async (req, res, next) => {
  const response = await services.blogCreate(req);
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
const blogUpdate = async (req, res, next) => {
    const response = await services.blogUpdate(req);
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
  const blogDelete = async (req, res, next) => {
    const response = await services.blogDelete(req);
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
  const getBlogDetail = async (req, res, next) => {
    const response = await services.getBlogDetail(req);
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
  const getAllBlogs = async (req, res, next) => {
    const response = await services.getAllBlogs(req);
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
    blogCreate,
    blogUpdate,
    blogDelete,
    getBlogDetail,
    getAllBlogs,
};
