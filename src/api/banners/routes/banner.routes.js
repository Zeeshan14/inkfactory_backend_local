const router = require('express').Router();
const authJwt = require("../../../utils/helpers/authJwt");
const {uploadImage}=require('../../../utils/helpers/fileUpload');
const {bannerCreate,bannerUpdate,getAllBanners,bannerDelete,getSingleBannerDetail}=require('../controllers/banner.controller');
router.post("/bannerCreate",authJwt,uploadImage.single("banner_image"),bannerCreate);
router.put("/bannerUpdate/:id",authJwt,uploadImage.single("banner_image"),bannerUpdate);
router.delete("/bannerDelete/:id",authJwt,bannerDelete);
router.get("/getAllBanners",getAllBanners);
router.get("/getSingleBannerDetail/:id",getSingleBannerDetail);

module.exports = router