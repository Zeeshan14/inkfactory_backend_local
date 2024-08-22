const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/db');
const models = require('../../../utils/constants/models');

class ProductSetting extends Model {}

ProductSetting.init({
    // Define fields
    isedited: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    imgName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Image: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uniques: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    position_x: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    position_y: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    horizontal_x: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    horizontal_y: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    vertical_x: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    vertical_y: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    sliderValue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    boundImage: {
        type: DataTypes.JSON,
        allowNull: false
    },
    disable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    bounds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ImageHover: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    variationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    EditedImage: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ProductCreate',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: models.ProductSetting,
    tableName: 'ProductSetting',
    timestamps: false
});


module.exports = ProductSetting;