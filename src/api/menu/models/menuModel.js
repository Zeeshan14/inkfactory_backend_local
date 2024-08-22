const {DataTypes,Model}=require('sequelize');
const sequelize = require('../../../config/db');
const models =require('../../../utils/constants/models');
class Menu extends Model {

}

Menu.init({
    menu_title:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName:models.MENU
})
module.exports =Menu