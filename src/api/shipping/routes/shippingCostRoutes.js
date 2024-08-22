const router = require("express").Router();
const {createShippingCost, editShippingCost, getSingleShippingCost, shippingCostList,deleteShippingCost} =require("../controllers/shippingCostController");
const authJwt = require("../../../utils/helpers/authJwt");

router.post("/createShippingCost",authJwt,createShippingCost);
router.put("/editShippingCost/:id",authJwt,editShippingCost);
router.get("/getSingleShippingCost/:id",getSingleShippingCost);
router.get("/shippingCostList",shippingCostList);
router.delete("/deleteShippingCost/:id",authJwt,deleteShippingCost);


module.exports = router;
