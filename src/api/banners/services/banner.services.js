const response = require("../../../utils/response/genericResponse");
const errorResponse = require("../../../utils/response/errorResponse");
const fs = require("fs");
const { Banner, BannerProduct, Product } = require("../../../models/index");
const bannerCreate = async (req) => {
  try {
    //needs validator
    const { banner_title, banner_products } = req.body;
    const newBanner = await Banner.create({
      banner_title: banner_title,
      banner_image: req.file
        ? `${process.env.UPLOAD_FILE_URL}/${req.file.destination}${
            req.file.filename
          }`
        : null,
    });
    const bannerProductArray = banner_products?.map((element) => {
      return {
        banner_id: newBanner.id,
        product_id: parseInt(element),
      };
    });
    await BannerProduct.bulkCreate(bannerProductArray);
    // needs constants
    return response("Banner created successfully");
  } catch (err) {
    console.log(err)
    if (req.file) fs.unlinkSync(req.file.path);
    return errorResponse();
  }
};
const bannerUpdate = async (req) => {
  try {
    //needs validator
    const { id } = req.params;
    const { banner_title, banner_products } = req.body;
    const banner = await Banner.findByPk(id);
    if (req.file) {
      try{
        fs.unlinkSync(
          banner.banner_image
            .split(process.env.UPLOAD_FILE_URL + "/")[1]
            .replaceAll("/", "\\")
        );
      }catch(err){
        console.log("Error on deleting old file",err)
      }
    }

    await banner.update({
      banner_title,
      banner_image: req.file
        ? `${process.env.UPLOAD_FILE_URL}/${req.file.destination}${
            req.file.filename
          }`
        : banner.banner_image,
    });
    const bannerProductArray = banner_products.map((element) => {
      return {
        banner_id: banner.id,
        product_id: element,
      };
    });
    await BannerProduct.destroy({ where: { banner_id: id } });
    await BannerProduct.bulkCreate(bannerProductArray);
    // needs constants
    return response("Banner updated successfully");
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    return errorResponse();
  }
};
const getAllBanners = async (req) => {
  try {
    const allBanners = await Banner.findAll({
      include: {
        model: BannerProduct,
        include: {
          model: Product,
        },
      },
    });
    return response("Banner fetched successfully",allBanners);
  } catch (err) {
    return errorResponse();
  }
};
const bannerDelete =async(req)=>{
  try {
    //needs bvalidator
    const banner =await Banner.findByPk(req.params.id);
    if(!banner)
    {
      return errorResponse("Banner not found",{},false,400);
    }
    if(banner.banner_image)
    {
      try{
        fs.unlinkSync(
          banner.banner_image
          .split(process.env.UPLOAD_FILE_URL + "/")[1]
          .replaceAll("/", "\\")
      )
      }catch(err){
        console.log("Error on deleting old file",err)
      };
    }

    await banner.destroy();
    return response("Banner deleted successfully");
  } catch (err) {
    return errorResponse();
  }
}
const getSingleBannerDetail =async(req)=>{
    try{
        const {id}=req.params;
        const bannerDetail = await Banner.findOne({
            where:{
                id:id
            },
            include:BannerProduct
        })
        return response("Banner fetched successfully",bannerDetail)
    }catch(err)
    {
        return errorResponse();
    }
}
module.exports = {
  bannerCreate,
  bannerUpdate,
  getAllBanners,
  bannerDelete,
  getSingleBannerDetail
};
