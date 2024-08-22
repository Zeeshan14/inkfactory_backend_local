const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const { Category, SubCategory, Product } = require("../../../models/index");
const messages = require("../../../utils/constants/messages");
const errorResponse = require("../../../utils/response/errorResponse");
const { Op } = require("sequelize");
const getCategory = async (req) => {
  try {
    const category = await Category.findByPk(req.params.id);
    return response(messages.CATEGORY_GET, category, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const getAllCategory = async (req) => {
  try {
    const allCategories = await Category.findAll({where:{
      is_shop_product_range:false
    }});
    return response(messages.CATEGORY_GET, allCategories);
  } catch (err) {
    return errorResponse();
  }
};
const getAllCategoriesForAdmin = async (req) => {
  try {
    const allCategories = await Category.findAll();
    return response(messages.CATEGORY_GET, allCategories);
  } catch (err) {
    return errorResponse();
  }
};
const getSubCategory = async (req) => {
  try {
    const category = await SubCategory.findByPk(req.params.id);
    return response(messages.SUB_CATEGORY_GET, category, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const getSubCategoryOfCategory = async (req) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: SubCategory,
    });
    return response(messages.SUB_CATEGORY_GET, category, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const getAllSubCategories = async (req) => {
  try {
    const { search } = req.query;
    let allCategories = [];
    if (search) {
      allCategories = await SubCategory.findAll({
        where: {
          sub_category_title: {
            [Op.like]: "%" + search + "%",
          },
        },
      });
    } else {
      allCategories = await SubCategory.findAll({
        include: [{ model: Category, attributes: ["category_title"] }],
      });
    }

    return response(messages.CATEGORY_GET, allCategories);
  } catch (err) {
    console.log(err)
    return errorResponse();
  }
};
const getAllSubCategoriesForLandingScreen = async (req) => {
  try {
    const allCategories = await SubCategory.findAll({
      where: { is_on_home: true },
      include: [{ model: Product }],
    });
    return response(messages.CATEGORY_GET, allCategories);
  } catch (err) {
    return errorResponse();
  }
};
const getCategoryWithSubCategories = async (req) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: { model: SubCategory, include: Product },
    });
    return response(messages.CATEGORY_GET, category, true, status.OK);
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
const getShopProductRangeCategries = async (req) => {
  try {
    const allCategories = await Category.findAll({where:{
      is_shop_product_range:true
    }});
    return response(messages.CATEGORY_GET, allCategories);
  } catch (err) {
    return errorResponse();
  }
};
const getAllCategoriesForProductFilter = async (req) => {
  try {
    const allCategories = await Category.findAll({include:SubCategory});
    return response(messages.CATEGORY_GET, allCategories);
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  getCategory,
  getAllCategory,
  getSubCategory,
  getSubCategoryOfCategory,
  getAllSubCategories,
  getAllSubCategoriesForLandingScreen,
  getCategoryWithSubCategories,
  getShopProductRangeCategries,
  getAllCategoriesForAdmin,
  getAllCategoriesForProductFilter
};
