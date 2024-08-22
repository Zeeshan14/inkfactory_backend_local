const {DataTypes,Model} = require('sequelize');
const sequelize = require('../../../config/db');
const models = require('../../../utils/constants/models');
//const Artist = require('./ArtistModel');

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