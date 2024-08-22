const router = require('express').Router();
const authJwt = require("../../../utils/helpers/authJwt");
const {placeOrder,getAllOrders,getSingleOrder,getStatus,changeStatus,getUserOrders}=require('../controller/order.controller');
router.post("/placeOrder",authJwt,placeOrder);//needs validation
router.get("/getAllOrders",authJwt,getAllOrders);
// router.get("/getSingleOrder/:id",authJwt,getSingleOrder);
router.get("/getSingleOrder/:id",getSingleOrder);
router.get("/getUserOrders/:id",authJwt,getUserOrders);
router.get("/getStatus",getStatus);
router.put("/changeStatus/:id",changeStatus);

module.exports = router