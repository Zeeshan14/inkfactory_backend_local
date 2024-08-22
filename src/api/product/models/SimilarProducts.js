const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class SimilarProduct extends Model {

}

SimilarProduct.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    similar_product_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    
},{
    sequelize,
    modelName:"SimilarProduct"
})
module.exports =SimilarProduct