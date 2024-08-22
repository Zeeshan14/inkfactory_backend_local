const messages = require("../../../utils/constants/messages");
const errorResponse = require("../../../utils/response/errorResponse");
const Menu = require("../models/menuModel");
const response = require("../../../utils/response/genericResponse");
const {
  MenuCategory,
  Category,
  MenuTitle,
  MenuTitleCategory,
  MenuCategorySubcategory,
  SubCategory,
} = require("../../../models");
const menuList = async (req) => {
  try {
    const menu = await Menu.findAll({
      include: [
        {
          model: Category,
          include:[{
            model:MenuCategory,
            include:[SubCategory]
          }]
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    return response("menu fetched successfully", menu);
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
const getMenyById = async (req) => {
  try {
    const menu = await Menu.findOne({
      where: { id: req.params.id },
      include: Category,
    });
    return response("menu fetched successfully", menu);
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  menuList,
  getMenyById,
};
