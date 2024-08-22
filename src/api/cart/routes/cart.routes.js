const router = require('express').Router();
const authJwt = require("../../../utils/helpers/authJwt");
const {addToCart,cartProductIncrement,getCartDetail,removeProductFromCart}=require('../controller/cart.controller');
router.post("/addToCart",authJwt,addToCart);
router.post("/cartProductIncrement",authJwt,cartProductIncrement); 
router.get("/getCartDetail",authJwt,getCartDetail);
router.delete("/removeProductFromCart/:id",removeProductFromCart);

module.exports = router