const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
class Status extends Model {}

Status.init(
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: "Status",
  }
);
module.exports = Status;
