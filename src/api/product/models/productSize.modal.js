const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductSize extends Model {

}

ProductSize.init({
    product_size:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_size_price:{
        type:DataTypes.DOUBLE,
        defaultValue:0
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductSize"
})
module.exports =ProductSize