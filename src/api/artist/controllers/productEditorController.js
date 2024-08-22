const ApiError = require("../../../utils/error/genericError");
const services = require("../services/productEditorServices");

const productEditor = async (req, res, next) => {
    const { body } = req;
    const response = await services.productEditor(body);
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
    productEditor,
};