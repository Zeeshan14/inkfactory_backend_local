const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class BannerProduct extends Model {

}

BannerProduct.init({
    banner_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{
    sequelize,
    modelName:"BannerProduct"
})
module.exports =BannerProduct