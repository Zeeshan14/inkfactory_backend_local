const ApiError = require("../../../utils/error/genericError");
const services = require("../services/order.services");

const placeOrder = async (req, res, next) => {
  const response = await services.placeOrder(req);
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
const getAllOrders = async (req, res, next) => {
  const response = await services.getAllOrders(req);
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
const getSingleOrder = async (req, res, next) => {
  const response = await services.getSingleOrder(req);
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
const getStatus = async (req, res, next) => {
  const response = await services.getStatus(req);
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
const changeStatus = async (req, res, next) => {
  const response = await services.changeStatus(req);
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
const getUserOrders = async (req, res, next) => {
  const response = await services.getUserOrders(req);
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
    placeOrder,
    getAllOrders,
    getSingleOrder,
    getStatus,
    changeStatus,
    getUserOrders
};
