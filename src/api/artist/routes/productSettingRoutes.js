const authJwt = require('../../../utils/helpers/authJwt');
const { allProductSettings } = require('../controllers/productSettingController');
const router = require('express').Router();

router.get("/allProductSettings", authJwt, allProductSettings);

module.exports = router;
