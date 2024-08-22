const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class Blog extends Model {

}

Blog.init({
    blog_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    blog_detail:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    blog_image:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    sequelize,
    modelName:models.BLOG
})
module.exports =Blog