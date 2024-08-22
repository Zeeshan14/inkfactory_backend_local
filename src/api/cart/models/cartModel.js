const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class Cart extends Model {

}

Cart.init({
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"pending"
    },
    amount:{
        type:DataTypes.DOUBLE,
        defaultValue:0.00
    }
},{
    sequelize,
    modelName:models.CART
})
module.exports =Cart