const ApiError = require("../../../utils/error/genericError");
const services = require("../services/cart.services");

const addToCart = async (req, res, next) => {
  const response = await services.addToCart(req);
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
const cartProductIncrement = async (req, res, next) => {
    const response = await services.cartProductIncrement(req);
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
  const getCartDetail = async (req, res, next) => {
    const response = await services.getCartDetail(req);
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
  const removeProductFromCart = async (req, res, next) => {
    const response = await services.removeProductFromCart(req);
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
    addToCart,
    cartProductIncrement,
    getCartDetail,
    removeProductFromCart
};
