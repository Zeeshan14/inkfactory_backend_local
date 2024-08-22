const ApiError = require("../../../utils/error/genericError");
const services = require("../services/artistServices");
const allArtists = async (req, res, next) => {
  const response = await services.allArtists(req);
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
const deleteArtist = async (req, res, next) => {
    const response = await services.deleteArtist(req);
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
const updateArtist = async (req, res, next) => {
    const response = await services.updateArtist(req);
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
const updateArtistAddresses = async (req, res, next) => {
  const response = await services.updateArtistAddresses(req);
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

const createArtist = async (req, res, next) => {
  const response = await services.createArtist(req);
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

const getArtistById = async (req, res, next) => {
  const response = await services.getArtistById(req);
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
  allArtists,
  deleteArtist,
  updateArtist,
  updateArtistAddresses,
  createArtist,
  getArtistById
};
