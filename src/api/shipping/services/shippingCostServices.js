const messages = require("../../../utils/constants/messages");
const errorResponse = require("../../../utils/response/errorResponse");
const response = require("../../../utils/response/genericResponse");
const ShippingCost = require("../models/shippingCostModel");
const createShippingCost = async (req) => {
  try {
    const { shipping_code, price, city_name } = req.body;
    const shippingCost = await ShippingCost.create({
      shipping_code,
      price,
      city_name,
    });
    return response("Shipping cost created successfullt", shippingCost);
  } catch (err) {
    return errorResponse();
  }
};
const editShippingCost = async (req) => {
  try {
    const { shipping_code, price, city_name } = req.body;
    const { id } = req.params;
    const shippingCost = await ShippingCost.update(
      {
        shipping_code,
        price,
        city_name,
      },
      {
        where: {
          id,
        },
      }
    );
    return response("Shipping cost updated successfully", shippingCost);
  } catch (err) {
    return errorResponse();
  }
};
const shippingCostList = async (req) => {
  try {
    const getAllShippingCost = await ShippingCost.findAll();
    return response("Shipping costs fetched successfully", getAllShippingCost);
  } catch (err) {
    return errorResponse();
  }
};
const getSingleShippingCost = async (req) => {
  try {
    const { id } = req.params;
    const singleShippingCost = await ShippingCost.findByPk(id);
    return response("Shipping costs fetched successfully", singleShippingCost);
  } catch (err) {
    return errorResponse();
  }
};
const deleteShippingCost = async (req) => {
  try {
    const { id } = req.params;
    await ShippingCost.destroy({ where: { id } });
    return response("Shipping costs deleted successfully", {});
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  createShippingCost,
  editShippingCost,
  shippingCostList,
  getSingleShippingCost,
  deleteShippingCost,
};
