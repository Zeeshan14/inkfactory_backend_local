const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class MenuCategory extends Model {

}

MenuCategory.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    menu_id:{
        type:DataTypes.INTEGER,
        onDelete:"CASCADE",
        allowNull:false
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:models.MENU_CATEGORY
})
module.exports =MenuCategory