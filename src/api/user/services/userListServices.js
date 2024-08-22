const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const messages = require("../../../utils/constants/messages");
const { User, Role } = require("../../../models");
const errorResponse = require("../../../utils/response/errorResponse");
const { Op } = require("sequelize");
const allUsers = async(req)=>{
    try {
        const allUsers = await User.findAll({
          where:{
            id:{
              [Op.ne]:req.user.id
            }
          },
          include:Role});
        return response(messages.USER_FETCH, allUsers, true, status.OK);
      } catch (err) {
        return errorResponse();
      }
}
const getLoggedInUser = async(req)=>{
  try {
      const user = await User.findByPk(req.user.id,{
        attributes: { exclude: ['password'] },
        include:Role});
      return response(messages.USER_FETCH, user, true, status.OK);
    } catch (err) {
      return errorResponse();
    }
}
const getSingleUser = async(req)=>{
  try {
      const user = await User.findByPk(req.params.id,{
        attributes: { exclude: ['password'] },
        include:Role});
      return response(messages.USER_FETCH, user, true, status.OK);
    } catch (err) {
      return errorResponse();
    }
}
module.exports={
    allUsers,
    getLoggedInUser,
    getSingleUser
}