const response = require("../../../utils/response/genericResponse");
const errorResponse = require("../../../utils/response/errorResponse");
const sequelize = require("../../../config/db");
const messages = require("../../../utils/constants/messages");
const status = require("http-status");
const { ProductEditor } = require("../../../models");

const productEditor= async (req) => {
    try {
      const result = await ProductEditor.findAll();
      return response("Editor Fetched ", result, true, status.OK);
    } catch (err) {
      console.log(err);
      return errorResponse();
    }
  };

  module.exports = {
    productEditor
  };