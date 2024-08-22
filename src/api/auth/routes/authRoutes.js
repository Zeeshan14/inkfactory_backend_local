const router = require("express").Router();
const authController = require("../controllers/authController");
const authValidator = require("../validators/authValidator");
const authJwt = require("../../../utils/helpers/authJwt");
const { uploadProfilePic } = require("../../../utils/helpers/fileUpload");

router.post(
  "/signUp",
  uploadProfilePic.single("image"),
  authValidator.signUpValidator,
  authController.signUp
);
router.post("/signIn", authValidator.signInValidator, authController.signIn);
router.get("/checkAuth", authJwt, (req, res) => {
  return res.status(200).json({
    message: "Auth Verified",
    success: true,
    data: {},
  });
});

module.exports = router;
