const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductFinish extends Model {

}

ProductFinish.init({
    product_finish:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_finish_price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductFinish"
})
module.exports =ProductFinish