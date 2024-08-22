const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const User = require("../../user/models/UserModel");
const ApiError = require("../../../utils/error/genericError");
const messages = require("../../../utils/constants/messages");
const bcrypt = require("bcrypt");
const assignJwt = require("../../../utils/helpers/jwt");
const fs = require('fs');
const errorResponse = require("../../../utils/response/errorResponse");
const { Role } = require("../../../models");
const signUp = async (req, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      contact_number,
      role_id,
    } = req.body;
    const userAlreadyExist = await User.findOne({
      where: { username: username },
    });
    if (userAlreadyExist) {
      if (req.file) {
        try{
          fs.unlinkSync(req.file.path);
        }catch(err){
          console.log("Error on deleting old file",err)
        }
        
      }
      return response(messages.USER_EXIST, {}, false, status.BAD_REQUEST);
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createUser = await User.create({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
      role_id,
      contact_number,
      profile_pic: req.file
        ? `${process.env.UPLOAD_FILE_URL}/${req.file.destination}${
            req.file.filename
          }`
        : null,
    });
    return response(messages.USER_CREATED);
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return errorResponse();
  }
};
const signIn = async (req, next) => {
  try {
    const { username, password } = req.body;
    let userExist = await User.findOne({
      where: { username: username },
      include:[Role],
    });
    if (!userExist) {
      return response(
        messages.INVALID_USER_OR_PASS,
        {},
        false,
        status.BAD_REQUEST
      );
    }
    const comparepassword = bcrypt.compareSync(password, userExist.password);
    if (!comparepassword) {
      return response(
        messages.INVALID_USER_OR_PASS,
        {},
        false,
        status.BAD_REQUEST
      );
    }
    const token = await assignJwt(userExist.toJSON(),{ expiresIn: "24h" });
    userExist =userExist.toJSON()
    userExist.token = token;
    delete userExist.password;
    return response(messages.LOG_IN, userExist);
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
module.exports = {
  signUp,
  signIn,
};
