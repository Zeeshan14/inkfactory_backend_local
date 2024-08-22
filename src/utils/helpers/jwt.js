const jwt = require("jsonwebtoken");

const assignJwt = async (userData) => {
  const token = await jwt.sign(
    userData, 
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRY},
  );
  return token;
};
module.exports = assignJwt;
