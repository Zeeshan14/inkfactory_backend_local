const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class SubCategory extends Model {

}

SubCategory.init({
    sub_category_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    sub_category_description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    sub_category_image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    sub_category_banner_image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    is_on_home:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    sequelize,
    modelName:models.SUB_CATEGORY
})
module.exports =SubCategory