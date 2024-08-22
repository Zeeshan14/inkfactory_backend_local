const { createProduct } = require("./productCreateServices");
const { updateProduct,deleteProduct,deleteImage  } = require("./productUpdateServices");
const { getProduct,getCategoryProducts,getAllProduct,getFeaturedProduct } = require("./productListServices");

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  getCategoryProducts,
  getAllProduct,
  getFeaturedProduct,
  deleteImage
};
