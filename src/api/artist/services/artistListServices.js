const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const messages = require("../../../utils/constants/messages");
const { Artist, Role } = require("../../../models");
const errorResponse = require("../../../utils/response/errorResponse");
const { Op } = require("sequelize");
const allArtists = async(req)=>{
    try {
        const allArtists = await Artist.findAll({
          where:{
            id:{
              [Op.ne]:req.artist.id
            }
          },
          include:Role});
        return response(messages.ARTIST_FETCH, allArtists, true, status.OK);
      } catch (err) {
        return errorResponse();
      }
}
module.exports={
    allArtists
}