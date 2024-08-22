const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const ProductModel = require("../models/productModel");
const ProductImages = require("../models/productImagesModel");
const messages = require("../../../utils/constants/messages");
const fs =require('fs')
const errorResponse = require("../../../utils/response/errorResponse");
const ProductColor = require("../models/productColor.modal");
const ProductSize = require("../models/productSize.modal");
const ProductMaterial = require("../models/productMaterial.model");
const { json } = require("sequelize");
const ProductFinish = require("../models/ProductFinish.model");
const ProductType = require("../models/ProductType.model");
const ProductOption = require("../models/ProductOptions.model");
const CategoryProduct = require("../models/CategoryProducts");
const SimilarProduct = require("../models/SimilarProducts");
const createProduct = async (req, res) => {
  try {
    const {
      product_title,
      product_description,
      product_long_description,
      price,
      sale_price,
      quantity,
      sku,
      sub_category_id,
      is_featured,
      product_color,
      product_size,
      product_material,
      product_finish,
      product_type,
      product_option,
      min_buy_quantity,
      multi_category,
      is_name_card,
      is_business_card,
      print_location_enabled,
      similar_products,
    } = req.body;
    const productCreate =await ProductModel.create({
      product_title,
      product_description,
      product_image: req.files.product_image.length >0 
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.product_image[0].destination}${
            req.files.product_image[0].filename
          }`
        : null,
      price,
      sale_price,
      quantity,
      sku,
      product_long_description,
      sub_category_id,
      min_buy_quantity,
      is_featured,
      is_name_card,
      is_business_card,
      print_location_enabled,
    });
    if(req.files.product_multi_image && req.files.product_multi_image.length > 0)
    {
      const productImages =  req.files.product_multi_image.map((element)=>{
        return {
          product_id:productCreate.id,
          product_image:`${process.env.UPLOAD_FILE_URL}/${element.destination}${
            element.filename}`

        }
      })
      await ProductImages.bulkCreate(productImages);
    }
    if(product_color.length >0)
    {
      const productColorArray = JSON.parse(product_color).map((element)=>{
        return {
          product_color:element.product_color,
          product_color_price:element.product_color_price,
          product_color_code:element.product_color_code,
          product_id:productCreate.id
        }
      })
      await ProductColor.bulkCreate(productColorArray)
    }
    if(product_size.length >0)
    {
      const productSizeArray = JSON.parse(product_size).map((element)=>{
        return {
          product_size:element.product_size,
          product_size_price:element.product_size_price,
          product_id:productCreate.id
        }
      })
      await ProductSize.bulkCreate(productSizeArray)
    }
    if(product_material.length >0)
    {
      const productMaterialArray = JSON.parse(product_material).map((element)=>{
        return {
          product_material:element.product_material,
          product_material_price:element.product_material_price,
          product_id:productCreate.id
        }
      })
      await ProductMaterial.bulkCreate(productMaterialArray)
    }
    if(product_finish.length >0)
    {
      const productFinishArray = JSON.parse(product_finish).map((element)=>{
        return {
          product_finish:element.product_finish,
          product_finish_price:element.product_finish_price,
          product_id:productCreate.id
        }
      })
      await ProductFinish.bulkCreate(productFinishArray)
    }
    if(product_type.length >0)
    {
      const productTypeArray = JSON.parse(product_type).map((element)=>{
        return {
          product_type:element.product_type,
          product_type_price:element.product_type_price,
          product_id:productCreate.id
        }
      })
      await ProductType.bulkCreate(productTypeArray)
    }
    if(product_option.length >0)
    {
      const productOptionArray = JSON.parse(product_option).map((element)=>{
        return {
          product_option:element.product_option,
          product_option_price:element.product_option_price,
          product_id:productCreate.id
        }
      })
      await ProductOption.bulkCreate(productOptionArray)
    }
    if(multi_category.length >0)
    {
      const multiCategory = JSON.parse(multi_category).map((element)=>{
        return {
          sub_category_id:element,
          product_id:productCreate.id
        }
      })
      await CategoryProduct.bulkCreate(multiCategory)
    }
    if(similar_products.length >0)
    {
      const similarProducts = JSON.parse(similar_products).map((element)=>{
        return {
          product_id:productCreate.id,
          similar_product_id:element,
        }
      })
      await SimilarProduct.bulkCreate(similarProducts)
    }
    return response(messages.PRODUCT_CREATE, {}, true, status.OK);
  } catch (err) {
    if(req.files && req.files.length > 0) fs.unlinkSync(req.files.product_image[0].path);
    console.log(err);
    return errorResponse();
  }
};
module.exports = {
  createProduct,
};
