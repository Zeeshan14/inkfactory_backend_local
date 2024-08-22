const ApiError = require("../../../utils/error/genericError");
const services = require("../services/productSettingServices");

const allProductSettings = async (req, res, next) => {
    const response = await services.allProductSettings(req);
    if (!response.success) {
        next(new ApiError(response.message, response.status));
    } else {
        return res.status(response.status).json({
            message: response.message,
            success: response.success,
            data: response.data,
        });
    }
};

module.exports = {
    allProductSettings
};

