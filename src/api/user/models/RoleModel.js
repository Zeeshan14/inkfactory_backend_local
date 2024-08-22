const {DataTypes,Model} = require('sequelize');
const sequelize = require('../../../config/db');
const models = require('../../../utils/constants/models');
const User = require('./UserModel');

class Role extends Model {}

Role.init({
    role:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName:models.ROLE
})
module.exports = Role