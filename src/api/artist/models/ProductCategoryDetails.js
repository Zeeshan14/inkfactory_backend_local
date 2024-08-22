const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/db');
const models = require('../../../utils/constants/models');

const ProductCategoryDetails = sequelize.define('ProductCategoryDetails', {
    artistid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProductCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OriginalImage: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    productId: {  // New field for referencing the product
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ProductCreate', // Ensure this matches the actual name of your Product table
            key: 'id'
        }
    },
    productImage: {  // Renamed field
        type: DataTypes.TEXT,
        allowNull: true // Assuming it's optional
    }
}, {
    sequelize,
    modelName: models.ProductCategoryDetails,
    timestamps: true,
    tableName: 'ProductCategoryDetails'
});
// ProductCategoryDetails.belongsTo(Product, { as: 'product', foreignKey: 'productId' });


module.exports = ProductCategoryDetails;
