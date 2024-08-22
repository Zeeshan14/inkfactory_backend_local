const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const messages = require("../../../utils/constants/messages");
const  ProductSetting  = require("../../../api/artist/models/ProductSettingModel");
const errorResponse = require("../../../utils/response/errorResponse");

const allProductSettings = async () => {
    try {
        const allSettings = await ProductSetting.findAll();
        return response(messages.FETCH_SUCCESS, allSettings, true, status.OK);
    } catch (err) {
        return errorResponse();
    }
};

module.exports = {
    allProductSettings
};
