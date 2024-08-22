const router = require("express").Router();
const {menuCreate,menuList,menuUpdate,menuCategoryUpdate,menuDelete,getMenyById} =require("../controllers/menuController");
const authJwt = require("../../../utils/helpers/authJwt");
const { uploadProfilePic } = require("../../../utils/helpers/fileUpload");

router.post("/menuCreate",authJwt,menuCreate);
router.get("/menuList",menuList);
router.get("/getMenyById/:id",getMenyById);
router.put("/menuUpdate/:id",menuUpdate);
router.put("/menuCategoryUpdate",menuCategoryUpdate);
router.delete("/menuDelete/:id",menuDelete);


module.exports = router;
