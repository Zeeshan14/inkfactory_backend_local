const passport = require("passport");
const messages = require("../constants/messages");
const ApiError = require("../error/genericError");
const authJwt = async (req,res,next) => {
  passport.authenticate("jwt", { session: false },
    function (err, user, info) {
      if (err) {
        return next(new ApiError(info, 400));
      }
      if (!user) {
        return next(new ApiError(messages.INVALID_TOKEN, 401));
      }
      req.user = user;
      next();
    })(req,res,next);
};
module.exports = authJwt;
