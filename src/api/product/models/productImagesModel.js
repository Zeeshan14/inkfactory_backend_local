const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductImages extends Model {

}

ProductImages.init({
    product_image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:models.PRODUCTIMAGES
})
module.exports =ProductImages