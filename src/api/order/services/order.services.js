const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const fs = require("fs");
const { Op, Sequelize } = require("sequelize");
const {
  Category,
  SubCategory,
  Cart,
  CartProduct,
  Order,
  User,
  Product,
  ProductColor,
  ProductSize,
  ProductMaterial,
  Status,
} = require("../../../models/index");
const messages = require("../../../utils/constants/messages");
const errorResponse = require("../../../utils/response/errorResponse");
const { sendEmailForOrder, sendEmailToUserForOrder } = require("../../../utils/helpers/sendEmail");
const placeOrder = async (req) => {
  try {
    const {
      cart_id,
      name,
      address,
      phone,
      email,
      city,
      state,
      country,
      postcode,
      paymentMethod,
      note,
      payment_transaction_id,
      shipping_cost
    } = req.body;
    const userExist = await User.findByPk(req.user.id);
    if(!userExist)
    {
      return errorResponse("Invalid User", {}, false, 400);
    }
    const cartExist = await Cart.findByPk(cart_id);
    if (!cartExist) {
      return errorResponse("Cart is empty", {}, false, 400);
    }
    const newOrder = await Order.create({
      cart_id: cart_id,
      amount: cartExist.amount,
      name: name,
      email: email,
      city: city,
      country: country,
      state: state,
      postcode: postcode,
      address: address,
      phone: phone,
      user_id: req.user.id,
      paymentMethod,
      note,
      payment_transaction_id,
      shipping_cost
    });
    if(!userExist.address)
    {
      await userExist.update({
        address:address,
        city:city,
        state:state,
        country:country,
        postal_code:postcode,
      });
    }
    await cartExist.update({ status: "in_process" });
    await sendEmailForOrder(false,newOrder.id,null)
    await sendEmailToUserForOrder(email)
    return response("order placed successfully", {}, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const getAllOrders = async (req) => {
  try {
    const allOrders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });
    return response("orders fetched successfully", allOrders);
  } catch (err) {
    return errorResponse();
  }
};
const getSingleOrder = async (req) => {
  try {
    const getOrderDetail = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Cart,
          include: {
            model: CartProduct,
            include: [Product, ProductColor, ProductSize, ProductMaterial],
          },
        },
        {
          model: User,
        },
      ],
    });
    return response(
      "order detail fetched  successfully",
      getOrderDetail,
      true,
      status.OK
    );
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
const getStatus = async (req) => {
  try {
    const statuses = await Status.findAll({
      order: [["slug", "ASC"]],
    });
    return response("statuses fetched successfully", statuses);
  } catch (err) {
    return errorResponse();
  }
};
const changeStatus = async (req) => {
  try {
    const orderExist = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!orderExist) {
      return errorResponse("Order does not exist", {}, false, 400);
    }
    await orderExist.update({
      status: req.body.status,
    });
    await sendEmailForOrder(true,req.params.id,req.body.status)
    return response("status changed successfully");
  } catch (err) {
    return errorResponse();
  }
};
const getUserOrders = async (req) => {
  try {
    const getUserOrders = await Order.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [
        {
          model: Cart,
          include: {
            model: CartProduct,
            include: [Product, ProductColor, ProductSize, ProductMaterial],
          },
        },
        {
          model: User,
        },
      ],
    });
    return response(
      "orders  fetched  successfully",
      getUserOrders,
      true,
      status.OK
    );
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  getStatus,
  placeOrder,
  getAllOrders,
  getSingleOrder,
  changeStatus,
  getUserOrders,
};
