const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class CartProduct extends Model {

}

CartProduct.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cart_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false  
    },
    product_size_id:{
        type:DataTypes.INTEGER,
        allowNull:true  
    },
    product_color_id:{
        type:DataTypes.INTEGER,
        allowNull:true  
    },
    product_material_id:{
        type:DataTypes.INTEGER,
        allowNull:true  
    },
    product_type_id:{
        type:DataTypes.INTEGER,
        allowNull:true  
    },
    product_option_id:{
        type:DataTypes.INTEGER,
        allowNull:true  
    },
    product_finish_id:{
        type:DataTypes.INTEGER,
        allowNull:true  
    },
    qty:{
        type:DataTypes.INTEGER,
        defaultValue:1  
    },
    product_amount:{
        type:DataTypes.DOUBLE,
        defaultValue:0.00
    }

},{
    sequelize,
    modelName:"CartProduct"
})
module.exports =CartProduct