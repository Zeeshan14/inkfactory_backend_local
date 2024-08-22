const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const fs = require('fs');
const { Category, SubCategory } = require("../../../models/index");
const messages = require("../../../utils/constants/messages");
const errorResponse = require("../../../utils/response/errorResponse");
const createCategory = async (req) => {
  try {
    const {category_title,category_description,is_shop_product_range}= req.body;
    await Category.create({
        category_title,
        category_description,
        category_image: req.files.category_image?.length > 0
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.category_image[0]['destination']}${
            req.files.category_image[0]['filename']
          }`
        : null,
        category_banner_image: req.files.category_banner_image?.length > 0
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.category_banner_image[0]['destination']}${
            req.files.category_banner_image[0]['filename']
          }`
        : null,
        is_shop_product_range:is_shop_product_range == "on" ? true :false,
    });
    return response(messages.CATEGORY_CREATED,{},true,status.OK);
  } catch (err) {
    console.log(err)
    if(req.files.category_image) fs.unlinkSync(req.files.category_image[0]['path']);
    if(req.files.category_banner_image) fs.unlinkSync(req.files.category_banner_image[0]['path']);
    return errorResponse();
  }
};
const createSubCategory = async (req) => {
  try {
    
    const {sub_category_title,sub_category_description,category_id,is_on_home}= req.body;
    await SubCategory.create({
        sub_category_title,
        sub_category_description,
        is_on_home,
        sub_category_image: req.files.sub_category_image
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.sub_category_image[0]['destination']}${
            req.files.sub_category_image[0]['filename']
          }`
        : null,
        sub_category_banner_image: req.files.sub_category_banner_image
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.sub_category_banner_image[0]['destination']}${
            req.files.sub_category_banner_image[0]['filename']
          }`
        : null,
        category_id,
    });
    return response(messages.SUB_CATEGORY_CREATED);
  } catch (err) {
    if(req.files.sub_category_image) fs.unlinkSync(req.files.sub_category_image[0]['path']);
    if(req.files.sub_category_banner_image) fs.unlinkSync(req.files.sub_category_banner_image[0]['path']);
    return errorResponse();
  }
};
module.exports = {
    createCategory,
    createSubCategory
};
