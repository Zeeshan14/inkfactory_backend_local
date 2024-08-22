const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class ContactUs extends Model {

}

ContactUs.init({
    email_address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    order_number:{
        type:DataTypes.STRING,
        allowNull:true
    },
    subject:{
        type:DataTypes.STRING,
        allowNull:false
    },
    note:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:models.CONTACT_US
})
module.exports =ContactUs