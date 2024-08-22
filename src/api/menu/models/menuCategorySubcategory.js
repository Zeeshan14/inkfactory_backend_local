const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class MenuCategorySubcategory extends Model {

}

MenuCategorySubcategory.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    menu_category_id:{
        type:DataTypes.INTEGER,
        onDelete:"CASCADE",
        allowNull:false
    },
    sub_category_id:{
        type:DataTypes.INTEGER,
        onDelete:"CASCADE",
        allowNull:false
    }
},{
    sequelize,
    modelName:models.MENU_CATEGORY_SUBCATEGORY
})
module.exports =MenuCategorySubcategory