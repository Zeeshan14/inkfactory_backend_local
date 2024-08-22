const router = require('express').Router();
const  authJwt  = require('../../../utils/helpers/authJwt');
const { createCollection, addProductToCollection, getProductsByCollection } = require('../controllers/collectionController');

router.post('/createCollection', authJwt, createCollection);
router.post('/addProductToCollection/:collectionId', authJwt, addProductToCollection);
router.get('/getProductsByCollection/:collectionId', authJwt, getProductsByCollection);

module.exports = router;
