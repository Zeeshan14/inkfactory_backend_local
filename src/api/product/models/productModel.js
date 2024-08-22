const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class Product extends Model {

}

Product.init({
    product_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    product_long_description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    product_image:{
        type:DataTypes.TEXT('medium'),
        allowNull:true
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue:1.00
    },
    sale_price:{
        type:DataTypes.DOUBLE,
        defaultValue:0,
        allowNull:true,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },
    sku:{
        type:DataTypes.STRING,
        allowNull:true
    },
    sub_category_id:{ //sub_category_id
        type:DataTypes.INTEGER,
        allowNull:false
    },
    min_buy_quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1,
        allowNull:false,
    },
    is_featured:{
        type:DataTypes.BOOLEAN,
        defaultValue:false  
    },    
    print_location_enabled:{
        type:DataTypes.BOOLEAN,
        defaultValue:false  
    },
    is_business_card:{
        type:DataTypes.BOOLEAN,
        defaultValue:false  
    },
    is_name_card:{
        type:DataTypes.BOOLEAN,
        defaultValue:false  
    }
},{
    sequelize,
    modelName:models.PRODUCT
})
module.exports =Product