const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ProductMaterial extends Model {

}

ProductMaterial.init({
    product_material:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_material_price:{
        type:DataTypes.DOUBLE,
        defaultValue:0
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    sequelize,
    modelName:"ProductMaterial"
})
module.exports =ProductMaterial