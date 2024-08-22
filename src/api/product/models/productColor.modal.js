const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductColor extends Model {

}

ProductColor.init({
    product_color:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_color_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_color_price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductColor"
})
module.exports =ProductColor