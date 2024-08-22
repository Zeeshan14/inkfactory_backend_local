const ApiError = require("../../../utils/error/genericError");
const services = require("../services/authServices");

const signUp = async (req, res, next) => {
  const response = await services.signUp(req);
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
const signIn = async (req, res, next) => {
  const response = await services.signIn(req);
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
  signUp,
  signIn,
};
