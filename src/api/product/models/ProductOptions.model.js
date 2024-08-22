const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductOption extends Model {

}

ProductOption.init({
    product_option:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_option_price:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductOption"
})
module.exports =ProductOption