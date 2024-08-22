const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const fs = require("fs");
const { Category, SubCategory } = require("../../../models/index");
const messages = require("../../../utils/constants/messages");
const errorResponse = require("../../../utils/response/errorResponse");
const updateCategory = async (req) => {
  try {
    const { category_title, category_description, is_shop_product_range } =
      req.body;
    const categoryExist = await Category.findByPk(req.params.id);
    if (!categoryExist) {
      try{
      if (req.files.category_image)
        fs.unlinkSync(req.files.category_image[0]["path"]);
      if (req.files.category_banner_image)
        fs.unlinkSync(req.files.category_banner_image[0]["path"]);
    }catch(err){
      console.log("Error on deleting old file", err);

    }finally{
      return response(
        messages.CATGEORY_NOT_EXIST,
        {},
        false,
        status.BAD_REQUEST
      );
    }

    }
    if (req.files.category_image) {
      try {
        fs.unlinkSync(
          categoryExist.category_image
            .split(process.env.UPLOAD_FILE_URL + "/")[1]
            .replaceAll("/", "\\")
        );
      } catch (err) {
        console.log("Error on deleting old file", err);
      }
    }
    if (req.files.category_banner_image) {
      try {
        fs.unlinkSync(
          categoryExist.category_banner_image
            .split(process.env.UPLOAD_FILE_URL + "/")[1]
            .replaceAll("/", "\\")
        );
      } catch (err) {
        console.log("Error on deleting old file", err);
      }
    }
    await categoryExist.update({
      category_title,
      category_description,
      category_image: req.files.category_image
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.category_image[0].destination}${req.files.category_image[0].filename}`
        : categoryExist.category_image,
      category_banner_image: req.files.category_banner_image
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.category_banner_image[0].destination}${req.files.category_banner_image[0].filename}`
        : categoryExist.category_banner_image,
      is_shop_product_range: is_shop_product_range == "on" ? true : false,
    });
    return response(messages.CATEGORY_UPDATED, {}, true, status.OK);
  } catch (err) {
    console.log(err);
    if (req.files.category_image)
      fs.unlinkSync(req.files.category_image[0]["path"]);
    if (req.files.category_banner_image)
      fs.unlinkSync(req.files.category_banner_image[0]["path"]);
    return errorResponse();
  }
};
const deleteCategory = async (req) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return errorResponse(messages.CATGEORY_NOT_EXIST, {}, false, 400);
    }
    if (category.category_image) {
      fs.unlinkSync(
        category.category_image
          .split(process.env.UPLOAD_FILE_URL + "/")[1]
          .replaceAll("/", "\\")
      );
    }
    await Category.destroy({ where: { id: req.params.id } });
    return response(messages.CATEGORY_DELETED);
  } catch (err) {
    return errorResponse();
  }
};
const updateSubCategory = async (req) => {
  try {
    const {
      sub_category_title,
      sub_category_description,
      category_id,
      is_on_home,
    } = req.body;
    const categoryExist = await SubCategory.findByPk(req.params.id);
    if (!categoryExist) {
      try {
        if (req.files.sub_category_image)
          fs.unlinkSync(req.files.sub_category_image[0]["path"]);
        if (req.files.sub_category_banner_image)
          fs.unlinkSync(req.files.sub_category_banner_image[0]["path"]);
      } catch (err) {
        console.log("Error on deleting old file", err);
      }

      return response(
        messages.CATGEORY_NOT_EXIST,
        {},
        false,
        status.BAD_REQUEST
      );
    }
    if (req.files.sub_category_image) {
      if (categoryExist.sub_category_image) {
        try {
          fs.unlinkSync(
            categoryExist.sub_category_image
              .split(process.env.UPLOAD_FILE_URL + "/")[1]
              .replaceAll("/", "\\")
          );
        } catch (err) {
          console.log("Error on deleting old file", err);
        }
      }
    }
    if (req.files.sub_category_banner_image) {
      if (categoryExist.sub_category_banner_image) {
        try {
          fs.unlinkSync(
            categoryExist.sub_category_banner_image
              .split(process.env.UPLOAD_FILE_URL + "/")[1]
              .replaceAll("/", "\\")
          );
        } catch (err) {
          console.log("Error on deleting old file", err);
        }
      }
    }
    await categoryExist.update({
      sub_category_title,
      sub_category_description,
      is_on_home,
      sub_category_image: req.files.sub_category_image
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.sub_category_image[0]["destination"]}${req.files.sub_category_image[0]["filename"]}`
        : categoryExist.category_image,
      sub_category_banner_image: req.files.sub_category_banner_image
        ? `${process.env.UPLOAD_FILE_URL}/${req.files.sub_category_banner_image[0]["destination"]}${req.files.sub_category_banner_image[0]["filename"]}`
        : categoryExist.category_image,
      category_id,
    });
    return response(messages.SUB_CATEGORY_UPDATED, {}, true, status.OK);
  } catch (err) {
    if (req.files.sub_category_image)
      fs.unlinkSync(req.files.sub_category_image[0]["path"]);
    if (req.files.sub_category_banner_image)
      fs.unlinkSync(req.files.sub_category_banner_image[0]["path"]);
    return errorResponse();
  }
};
const deleteSubCategory = async (req) => {
  try {
    const category = await SubCategory.findByPk(req.params.id);
    if (!category) {
      return errorResponse(messages.CATGEORY_NOT_EXIST, {}, false, 400);
    }
    if (category.sub_category_image) {
      fs.unlinkSync(
        category.sub_category_image
          .split(process.env.UPLOAD_FILE_URL + "/")[1]
          .replaceAll("/", "\\")
      );
    }
    await category.destroy();
    return response(messages.SUB_CATEGORY_DELETED);
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  updateCategory,
  deleteCategory,
  updateSubCategory,
  deleteSubCategory,
};
