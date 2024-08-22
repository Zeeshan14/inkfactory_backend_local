const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/db');
const models = require('../../../utils/constants/models');
const ProductCreate = require('./ProductCreate');

class Collection extends Model {}

Collection.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: models.Collection,
});

// Define associations
// const ProductMaster = require('./ProductMasterModel');

Collection.belongsToMany(ProductCreate, { through: 'CollectionProducts', foreignKey: 'collectionId' });
ProductCreate.belongsToMany(Collection, { through: 'CollectionProducts', foreignKey: 'productId' });


module.exports = Collection;
