const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/db");
const models = require("../../../utils/constants/models");
class Order extends Model {}

Order.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: "Pakistan",
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: "cod",
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_transaction_id: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    shipping_cost:{
      type: DataTypes.DOUBLE,
      defaultValue:0
    }
  },
  {
    sequelize,
    modelName: models.ORDER,
  }
);
module.exports = Order;
