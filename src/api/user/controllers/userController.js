const ApiError = require("../../../utils/error/genericError");
const services = require("../services/userServices");
const allUsers = async (req, res, next) => {
  const response = await services.allUsers(req);
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
const deleteUser = async (req, res, next) => {
    const response = await services.deleteUser(req);
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
const updateUser = async (req, res, next) => {
    const response = await services.updateUser(req);
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
const updateUserAddresses = async (req, res, next) => {
  const response = await services.updateUserAddresses(req);
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
const getLoggedInUser = async (req, res, next) => {
  const response = await services.getLoggedInUser(req);
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
const updateProfileImage = async (req, res, next) => {
  const response = await services.updateProfileImage(req);
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
const queryEmail = async (req, res, next) => {
  const response = await services.queryEmail(req);
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
const getSingleUser = async (req, res, next) => {
  const response = await services.getSingleUser(req);
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
  allUsers,
  deleteUser,
  updateUser,
  updateUserAddresses,
  getLoggedInUser,
  updateProfileImage,
  queryEmail,
  getSingleUser
};
