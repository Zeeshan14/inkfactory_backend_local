const authJwt = require('../../../utils/helpers/authJwt');
const { createProduct,updateProduct,quickEditProduct,updateVisibility, updateConsent, getAllProducts,getProductById,getProductsByArtistId} = require('../controllers/productMasterController');
const router = require('express').Router();

router.post("/createProduct", authJwt, createProduct);
router.put("/updateProduct/:id",updateProduct);
router.put("/quickEditProduct/:id",authJwt, quickEditProduct);
router.put("/updateVisibility/:id",authJwt, updateVisibility);
router.put("/updateConsent/:id", authJwt, updateConsent);
router.get("/getAllProducts", authJwt, getAllProducts);
router.get("/getProductById/:id", authJwt,  getProductById);
router.get("/getProductsByArtistId/:artistId", authJwt, getProductsByArtistId);

module.exports = router;
