const authJwt = require('../../../utils/helpers/authJwt');
const { uploadProfilePic, uploadImage } = require('../../../utils/helpers/fileUpload');
const {allUsers,deleteUser,updateUser,updateUserAddresses,getLoggedInUser,updateProfileImage,queryEmail,getSingleUser} = require('../controllers/userController');
const {userIdValidator, contactUsValidator} =require('../validators/userValidator');
const router = require('express').Router();
router.get("/allUsers",authJwt,allUsers)
router.get("/getUser/:id",authJwt,getSingleUser)
router.delete("/deleteUser/:id",authJwt,userIdValidator,deleteUser)
router.post("/updateUser/:id",authJwt,updateUser)
router.post("/updateUserAddresses/:id",authJwt,updateUserAddresses)
router.post("/queryEmail",authJwt,contactUsValidator,queryEmail)
router.get("/getLoggedInUser",authJwt,getLoggedInUser)
router.post("/updateProfileImage",authJwt,uploadImage.single("profile_pic"),updateProfileImage)

module.exports =router;