const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class User extends Model {

}

User.init({
    first_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact_number:{
        type:DataTypes.STRING,
        allowNull:true
    },
    profile_pic:{
        type:DataTypes.STRING,
        allowNull:true
    },
    cover_image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    country:{
        type:DataTypes.STRING,
        allowNull:true
    },
    city:{
        type:DataTypes.STRING,
        allowNull:true
    },
    postal_code:{
        type:DataTypes.STRING,
        allowNull:true
    },
    shipping_address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    shipping_country:{
        type:DataTypes.STRING,
        allowNull:true
    },
    shipping_city:{
        type:DataTypes.STRING,
        allowNull:true
    },
    shipping_postal_code:{
        type:DataTypes.STRING,
        allowNull:true
    },
    role_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:models.USER
})
module.exports =User