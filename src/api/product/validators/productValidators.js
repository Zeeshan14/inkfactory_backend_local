const joi = require("joi");
const fs=require('fs');
const productCreateValidator = async (req, res, next) => {
  try {
    const productCreateSchema = joi.object({
      product_title: joi.string().required(),
      product_description: joi.string().required(),
      price: joi.number().required(),
      quantity: joi.number().required(),
      sku: joi.string().required(),
      sub_category_id: joi.number().required(),
    });
    await productCreateSchema.validateAsync({
      product_title: req.body.product_title,
      product_description: req.body.product_description,
      price: req.body.price,
      quantity: req.body.quantity,
      sku: req.body.sku,
      sub_category_id: req.body.sub_category_id,
    });
  } catch (err) {
    if(req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({
      message: err.message,
      success: false,
      data: {},
    });
  }
  next();
};
const productUpdateValidator = async (req, res, next) => {
  try {
    const productUpdateSchema = joi.object({
      product_title: joi.string().required(),
      product_description: joi.string().required(),
      price: joi.number().required(),
      quantity: joi.number().required(),
      sku: joi.string().required(),
      sub_category_id: joi.number().required(),
      id: joi.number().required(),
    });
    await productUpdateSchema.validateAsync({
      product_title: req.body.product_title,
      product_description: req.body.product_description,
      price: req.body.price,
      quantity: req.body.quantity,
      sku: req.body.sku,
      sub_category_id: req.body.sub_category_id,
      id: req.params.id,
    });
  } catch (err) {
    if(req.file) fs.unlinkSync(req.file.path)
    return res.status(400).json({
      message: err.message,
      success: false,
      data: {},
    });
  }
  next();
};
const productIdValidator = async (req, res, next) => {
  try {
    const productIdSchema = joi.object({
      id: joi.number().required(),
    });
    await productIdSchema.validateAsync({
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
module.exports = {
  productCreateValidator,
  productUpdateValidator,
  productIdValidator,
};
