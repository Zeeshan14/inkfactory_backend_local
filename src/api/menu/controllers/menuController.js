const ApiError = require("../../../utils/error/genericError");
const services = require("../services/menuServices");

const menuCreate = async (req, res, next) => {
  const response = await services.menuCreate(req);
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
const menuList = async (req, res, next) => {
    const response = await services.menuList(req);
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
  const menuUpdate = async (req, res, next) => {
    const response = await services.menuUpdate(req);
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
  const menuCategoryUpdate = async (req, res, next) => {
    const response = await services.menuCategoryUpdate(req);
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
  const menuDelete = async (req, res, next) => {
    const response = await services.menuDelete(req);
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
  const getMenyById = async (req, res, next) => {
    const response = await services.getMenyById(req);
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
    menuCreate,
    menuList,
    menuUpdate,
    menuCategoryUpdate,
    menuDelete,
    getMenyById
};
