const joi = require('joi');
const artistIdValidator = async (req, res, next) => {
    try {
      const artistIdSchema = joi.object({
        id: joi.number().required(),
      });
      await artistIdSchema.validateAsync({
        id: req.params.id,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
        success: false,
        data: {},
      });
    }
    next();
  };
  module.exports={
    artistIdValidator
  }