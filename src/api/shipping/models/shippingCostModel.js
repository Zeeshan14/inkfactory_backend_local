const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/db");
const models = require("../../../utils/constants/models");
class ShippingCost extends Model {}

ShippingCost.init(
  {
    shipping_code: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    city_name:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: models.SHIPPING_COST,
  }
);
module.exports = ShippingCost;
