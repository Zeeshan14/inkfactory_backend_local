const ApiError = require("../../../utils/error/genericError");
const services = require("../services/banner.services");

const bannerCreate = async (req, res, next) => {
  const response = await services.bannerCreate(req);
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
const bannerUpdate = async (req, res, next) => {
    const response = await services.bannerUpdate(req);
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
  const getAllBanners = async (req, res, next) => {
    const response = await services.getAllBanners(req);
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
  const bannerDelete = async (req, res, next) => {
    const response = await services.bannerDelete(req);
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
  const getSingleBannerDetail = async (req, res, next) => {
    const response = await services.getSingleBannerDetail(req);
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
    bannerCreate,
    bannerUpdate,
    getAllBanners,
    bannerDelete,
    getSingleBannerDetail
};
