const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const ProductModel = require("../models/productModel");
const CategoryProduct = require("../models/CategoryProducts");
const SimilarProduct = require("../models/SimilarProducts");
const messages = require("../../../utils/constants/messages");
const fs = require('fs');
const errorResponse = require("../../../utils/response/errorResponse");
const {Product, ProductImages, ProductColor, ProductSize, ProductMaterial, ProductFinish, ProductType, ProductOption} = require("../../../models/index");
const updateProduct = async (req) => {
  try {
    const {
      // product_title,
      // product_description,
      // price,
      // quantity,
      // sku,
      // product_long_description,
      // sub_category_id,
      // is_featured
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
      similar_products
    } = req.body;
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product)
    {
      return errorResponse(messages.PRODUCT_NOT_FOUND,{},false,400);
    }
    const image = product.product_image;
    if (req.files.product_image) {
      try{
        fs.unlinkSync(product.product_image.split(process.env.UPLOAD_FILE_URL + "/")[1]
        ?.replaceAll("/", "\\"));
      }catch(err){
        console.log("Error on deleting old file",err)
      }
    }
    if(req?.files?.product_multi_image && req?.files?.product_multi_image?.length > 0)
    {
      try{
      const allProductImages = await ProductImages.findAll({where:{
        product_id:id
      }})
      await ProductImages.destroy({where:{
        product_id:id
      }})
      const productImages =  req.files.product_multi_image.map((element)=>{
        return {
          product_id:product.id,
          product_image:`${process.env.UPLOAD_FILE_URL}/${element.destination}${
            element.filename}`

        }
      })
      await ProductImages.bulkCreate(productImages);
      allProductImages.map((element)=>{
        fs.unlinkSync(element.product_image.split(process.env.UPLOAD_FILE_URL + "/")[1]
        .replaceAll("/", "\\"));        
      })
    }catch(err){
      console.log("Error on deleting old file",err)
    }
    }
    if(product_color.length >0)
    {
      await ProductColor.destroy({where:{
        product_id:id
      }})
      const productColorArray = JSON.parse(product_color).map((element)=>{
        return {
          product_color:element.product_color,
          product_color_price:element.product_color_price,
          product_color_code:element.product_color_code,
          product_id:id
        }
      })
      await ProductColor.bulkCreate(productColorArray)
    }
    if(product_size.length >0)
    {
      await ProductSize.destroy({where:{
        product_id:id
      }})
      const productSizeArray = JSON.parse(product_size).map((element)=>{
        return {
          product_size:element.product_size,
          product_size_price:element.product_size_price,
          product_id:id
        }
      })
      await ProductSize.bulkCreate(productSizeArray)
    }
    if(product_material.length >0)
    {
      await ProductMaterial.destroy({where:{
        product_id:id
      }})
      const productMaterialArray = JSON.parse(product_material).map((element)=>{
        return {
          product_material:element.product_material,
          product_material_price:element.product_material_price,
          product_id:id
        }
      })
      await ProductMaterial.bulkCreate(productMaterialArray)
    }
    if(product_finish.length >0)
    {
      await ProductFinish.destroy({where:{
        product_id:id
      }})
      const productFinishArray = JSON.parse(product_finish).map((element)=>{
        return {
          product_finish:element.product_finish,
          product_finish_price:element.product_finish_price,
          product_id:id
        }
      })
      await ProductFinish.bulkCreate(productFinishArray)
    }
    if(product_type.length >0)
    {
      await ProductType.destroy({where:{
        product_id:id
      }})
      const productTypeArray = JSON.parse(product_type).map((element)=>{
        return {
          product_type:element.product_type,
          product_type_price:element.product_type_price,
          product_id:id
        }
      })
      await ProductType.bulkCreate(productTypeArray)
    }
    if(product_material.length >0)
    {
      await ProductOption.destroy({where:{
        product_id:id
      }})
      const productOptionArray = JSON.parse(product_option).map((element)=>{
        return {
          product_option:element.product_option,
          product_option_price:element.product_option_price,
          product_id:id
        }
      })
      await ProductOption.bulkCreate(productOptionArray)
    }
    if(multi_category.length >0)
    {
      await CategoryProduct.destroy({where:{
        product_id:id
      }})
      const multiCategory = JSON.parse(multi_category).map((element)=>{
        return {
          sub_category_id:element,
          product_id:id
        }
      })
      await CategoryProduct.bulkCreate(multiCategory)
    }
    if(similar_products.length >0)
    {
      await SimilarProduct.destroy({where:{
        product_id:id
      }})
      const similarProducts = JSON.parse(similar_products).map((element)=>{
        return {
          product_id:id,
          similar_product_id:element,
        }
      })
      await SimilarProduct.bulkCreate(similarProducts)
    }
    await product.update({
      product_title,
      product_description,
      product_image: req.files.product_image
        ? `${process.env.UPLOAD_FILE_URL}/${req?.files?.product_image[0]?.destination}${
          req?.files?.product_image[0]?.filename
          }`
        : image,
      price,
      sale_price,
      quantity,
      sku,
      sub_category_id,
      product_long_description,
      is_featured,
      min_buy_quantity,
      is_name_card,
      is_business_card,
      print_location_enabled,
    });
    return response(messages.PRODUCT_UPDATE, {}, true, status.OK);
  } catch (err) {
    if(req.files && req.files.length > 0) fs.unlinkSync(req.file.path);
    return response(
      messages.SOMETHING_WENT_WRONG,
      {},
      false,
      status.INTERNAL_SERVER_ERROR
    );
  }
};
const deleteProduct = async (req) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    try{
    fs.unlinkSync(product.product_image.split(process.env.UPLOAD_FILE_URL + "/")[1]
    .replaceAll("/", "\\"));
    const allProductImages = await ProductImages.findAll({where:{
      product_id:req.params.id
    }})
    allProductImages.map((element)=>{
      fs.unlinkSync(element.product_image.split(process.env.UPLOAD_FILE_URL + "/")[1]
      .replaceAll("/", "\\"));        
    })
    }catch(err){
      console.log("Error in deleting files")
    }

    await product.destroy();
    return response(messages.PRODUCT_DELETE, {}, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const deleteImage = async (req) => {
  try {
    const productImage = await ProductImages.findByPk(req.params.id);
    try{
    fs.unlinkSync(productImage.product_image.split(process.env.UPLOAD_FILE_URL + "/")[1]
    .replaceAll("/", "\\"));
    }catch(err){
      console.log("Error in deleting files")
    }

    await productImage.destroy();
    return response(messages.PRODUCT_IMAGE, {}, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  updateProduct,
  deleteProduct,
  deleteImage
};
