const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductCardImage extends Model {

}

ProductCardImage.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductCardImage"
})
module.exports =ProductCardImage