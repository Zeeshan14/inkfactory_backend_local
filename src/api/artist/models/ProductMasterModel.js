const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/db');
const models = require('../../../utils/constants/models');
//const Collection = require('./CollectionModel');
const User = require('../../user/models/UserModel');

class ProductMaster extends Model {}

ProductMaster.init({
    productid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistid:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    viewVisibility: {
        type: DataTypes.ENUM('public', 'private'),
        allowNull: false
    },
    consent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    agreement: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    list: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    sequelize,
    modelName: models.ProductMaster,
    tableName: 'productmaster'
});

// Define associations
//const Collection = require('./CollectionModel');

//ProductMaster.belongsToMany(Collection, { through: 'CollectionProducts', foreignKey: 'productId' });
ProductMaster.belongsTo(User, { foreignKey: 'artistid', targetKey: 'id' });
//Collection.belongsToMany(ProductMaster, { through: 'CollectionProducts', foreignKey: 'collectionId' });

module.exports = ProductMaster;
