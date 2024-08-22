const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/db');
const models = require('../../../utils/constants/models');
const ProductCategoryDetails = require('./ProductCategoryDetails');


class ProductCreate extends Model {}

ProductCreate.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    viewVisibility: {
        type: DataTypes.STRING,
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
    artistid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',  // Reference the table name of the User model
            key: 'id'        // Reference the primary key field of the User model
        }
    }
    
    
}, {
    sequelize,
    modelName: models.ProductCreate,
    tableName: 'ProductCreate',
    timestamps: true,
});


module.exports = ProductCreate;
