const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class Banner extends Model {

}

Banner.init({
    banner_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    banner_image:{
        type:DataTypes.STRING,
        allowNull:true
    },
},{
    sequelize,
    modelName:"Banner"
})
module.exports =Banner