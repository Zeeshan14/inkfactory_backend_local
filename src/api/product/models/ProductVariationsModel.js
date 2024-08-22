const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductVariation extends Model {

}

ProductVariation.init({
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    size:{
        type:DataTypes.STRING,
        allowNull:false
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false
    },
    material:{
        type:DataTypes.STRING,
        allowNull:false  
    },
    orientation:{
        type:DataTypes.STRING,
        allowNull:false    
    }


},{
    sequelize,
    modelName:models.PRODUCT_VARIATIONS
})
module.exports =ProductVariation