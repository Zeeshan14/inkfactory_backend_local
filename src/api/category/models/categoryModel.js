const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class Category extends Model {
   
}

Category.init({
    category_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category_description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    category_image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    category_banner_image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    is_shop_product_range:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    sequelize,
    modelName:models.CATEGORY
})
module.exports =Category