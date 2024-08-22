const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductBusinessCard extends Model {

}

ProductBusinessCard.init({
    company_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    designation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email_address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    website:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cart_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductBusinessCard"
})
module.exports =ProductBusinessCard