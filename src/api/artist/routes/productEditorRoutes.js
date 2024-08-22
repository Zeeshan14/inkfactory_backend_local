const authJwt = require('../../../utils/helpers/authJwt');
const { productEditor } = require('../controllers/productEditorController');
const router = require('express').Router();

router.get("/editor",authJwt, productEditor);

module.exports = router;