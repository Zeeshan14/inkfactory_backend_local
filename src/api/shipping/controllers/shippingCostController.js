const services = require("../services/shippingCostServices")
const createShippingCost = async (req, res, next) => {
    const response = await services.createShippingCost(req);
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

  const editShippingCost = async (req, res, next) => {
    const response = await services.editShippingCost(req);
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

  const getSingleShippingCost = async (req, res, next) => {
    const response = await services.getSingleShippingCost(req);
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

  const shippingCostList = async (req, res, next) => {
    const response = await services.shippingCostList(req);
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
  const deleteShippingCost = async (req, res, next) => {
    const response = await services.deleteShippingCost(req);
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
  module.exports={
    createShippingCost,
    editShippingCost,
    getSingleShippingCost,
    shippingCostList,
    deleteShippingCost
  }