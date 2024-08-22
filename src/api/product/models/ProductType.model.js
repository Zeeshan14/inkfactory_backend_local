const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductType extends Model {

}

ProductType.init({
    product_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_type_price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductType"
})
module.exports =ProductType