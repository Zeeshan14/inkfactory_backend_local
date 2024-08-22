const joi = require('joi');
const userIdValidator = async (req, res, next) => {
    try {
      const userIdSchema = joi.object({
        id: joi.number().required(),
      });
      await userIdSchema.validateAsync({
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
  const contactUsValidator = async (req, res, next) => {
    try {
      const contactUsSchema = joi.object({
        email_address: joi.string().required(),
        name: joi.string().required(),
        order_number: joi.string().allow('').optional().allow(null),
        subject: joi.string().required(),
        note: joi.string().required(),
      });
      await contactUsSchema.validateAsync({
        email_address: req.body.email_address,
        name: req.body.name,
        order_number: req.body.order_number,
        subject: req.body.subject,
        note: req.body.note,
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
    userIdValidator,
    contactUsValidator
  }