const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const messages = require("../../../utils/constants/messages");
const {
  Category,
  Product,
  SubCategory,
  ProductImages,
  ProductColor,
  ProductSize,
  ProductMaterial,
  ProductFinish,
  ProductOption,
  ProductType,
  CategoryProduct,
} = require("../../../models");
const errorResponse = require("../../../utils/response/errorResponse");
const { Op } = require("sequelize");
const getProduct = async (req) => {
  try {
    const { id } = req.params;
    // const getProduct = await Product.findByPkfindByPk(id);
    const getProduct = await Product.findOne({
      where: {
        id: id,
      },
      include: [
        ProductImages,
        ProductColor,
        ProductSize,
        ProductMaterial,
        ProductFinish,
        ProductOption,
        ProductType,
        CategoryProduct,
        { model: Product, as: "similar" },
      ],
    });
    if (!getProduct) {
      return response(
        messages.PRODUCT_NOT_FOUND,
        {},
        false,
        status.BAD_REQUEST
      );
    }
    return response(messages.PRODUCT_GET, getProduct, true, status.OK);
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
const getCategoryProducts = async (req) => {
  try {
    const { price } = req.query;
    const categoryProducts = await SubCategory.findByPk(req.params.id, {
      include: {
        model:Product,
        where: price ? { price: { [Op.lte]: price } } : undefined,
      },
      
    });
    return response(messages.PRODUCT_GET, categoryProducts, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const getAllProduct = async (req) => {
  try {
    const { search } = req.query;
    let allProducts = [];
    if (search) {
      allProducts = await Product.findAll({
        where: {
          product_title: {
            [Op.like]: "%" + search + "%",
          },
        },
      });
    } else {
      allProducts = await Product.findAll({
        include: [{ model: SubCategory, attributes: ["sub_category_title"] }],
      });
    }
    return response(messages.PRODUCT_GET, allProducts);
  } catch (err) {
    return errorResponse();
  }
};
const getFeaturedProduct = async (req) => {
  try {
    const allProducts = await Product.findAll({
      where: {
        is_featured: true,
      },
      include: [{ model: SubCategory, attributes: ["sub_category_title"] }],
    });

    return response(messages.PRODUCT_GET, allProducts);
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  getProduct,
  getCategoryProducts,
  getAllProduct,
  getFeaturedProduct,
};
