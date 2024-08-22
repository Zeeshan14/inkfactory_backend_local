const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/db'); // Adjust the path as needed
const models = require('../../../utils/constants/models');

class ProductEditor extends Model {}

ProductEditor.init({
    imgName: {
        type: DataTypes.STRING(50),
        allowNull: true,  // Corresponds to DEFAULT NULL in MySQL
    },
    Image: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    uniques: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    position: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    horizontal: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    vertical: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    sliderValue: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    boundImage: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    disable: {
        type: DataTypes.BOOLEAN, // Sequelize uses BOOLEAN for tinyint(1)
        allowNull: true,
    },
    bounds: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isedited: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    variationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    EditedImage: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    ImageHover: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    sequelize,
    modelName: models.ProductEditor, // Define the model name in your constants file
    tableName: 'ProductEditor', // Explicitly set the table name if it differs from the model name
    timestamps: false, // Disable timestamps if your table does not have `createdAt` and `updatedAt` columns
});

module.exports = ProductEditor;