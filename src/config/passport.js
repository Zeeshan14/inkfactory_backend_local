const passport = require("passport");
const { User } = require("../models");
const messages = require("../utils/constants/messages");
const ApiError = require("../utils/error/genericError");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtStategy = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  return new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await User.findByPk(jwt_payload.id);
    if (!user) {
      return done(new ApiError(messages.INVALID_TOKEN, 401));
    }
    done(null, user);
  });
};
module.exports = jwtStategy;
