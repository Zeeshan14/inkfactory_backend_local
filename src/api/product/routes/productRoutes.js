const router = require("express").Router();
const {uploadProfilePic,uploadProductPic, uploadImage,uploadMultipleImages} =require('../../../utils/helpers/fileUpload');
const authJwt = require("../../../utils/helpers/authJwt");
const {productCreateValidator,productUpdateValidator,productIdValidator} = require('../validators/productValidators');
const {createProduct,updateProduct,getProduct,deleteProduct,getCategoryProducts,getAllProduct,getFeaturedProduct,deleteImage} = require('../controllers/productController');

router.get("/getAllProduct",getAllProduct)
router.get("/getFeaturedProduct",getFeaturedProduct)
// router.post("/createProduct",authJwt,uploadProductPic.single("product_image"),productCreateValidator,createProduct)
router.post("/createProduct",authJwt,uploadImage.fields([{name:"product_multi_image"},{name:"product_image"}]),productCreateValidator,createProduct)
router.put("/updateProduct/:id",authJwt,uploadImage.fields([{name:"product_multi_image"},{name:"product_image"}]),productUpdateValidator,updateProduct)
router.get("/getProduct/:id",productIdValidator,getProduct)
router.get("/getCategoryProducts/:id",productIdValidator,getCategoryProducts)
router.delete("/deleteProduct/:id",authJwt,productIdValidator,deleteProduct)
router.delete("/deleteImage/:id",authJwt,productIdValidator,deleteImage)

module.exports = router