const joi = require("joi");
const categoryCreateValidator = async (req, res, next) => {
  try {
    const categoryCreateSchema = joi.object({
      category_title: joi.string().required(),
      category_description: joi.string().required(),
    });
    await categoryCreateSchema.validateAsync({
      category_title: req.body.category_title,
      category_description: req.body.category_description,
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
const categoryUpdateValidator = async (req, res, next) => {
  try {
    const categoryUpdateSchema = joi.object({
      category_title: joi.string().required(),
      category_description: joi.string().required(),
      id: joi.number().required(),
    });
    await categoryUpdateSchema.validateAsync({
      category_title: req.body.category_title,
      category_description: req.body.category_description,
      id: req.params.id,
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
const categoryIdValidator = async (req, res, next) => {
  try {
    const categoryIdSchema = joi.object({
      id: joi.number().required(),
    });
    await categoryIdSchema.validateAsync({
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

//==================== Sub Category ============================//
const subCategoryCreateValidator = async (req, res, next) => {
  try {
    const subCategoryCreateSchema = joi.object({
      sub_category_title: joi.string().required(),
      sub_category_description: joi.string().required(),
      category_id: joi.number().required(),
    });
    await subCategoryCreateSchema.validateAsync({
      sub_category_title: req.body.sub_category_title,
      sub_category_description: req.body.sub_category_description,
      category_id: req.body.category_id,
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
const subCategoryUpdateValidator = async (req, res, next) => {
  try {
    const subCategoryUpdateSchema = joi.object({
      sub_category_title: joi.string().required(),
      sub_category_description: joi.string().required(),
      category_id: joi.number().required(),
      id: joi.number().required(),
    });
    await subCategoryUpdateSchema.validateAsync({
      sub_category_title: req.body.sub_category_title,
      sub_category_description: req.body.sub_category_description,
      category_id: req.body.category_id,
      id: req.params.id,
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
module.exports = {
  categoryCreateValidator,
  categoryUpdateValidator,
  categoryIdValidator,
  subCategoryCreateValidator,
  subCategoryUpdateValidator
};
