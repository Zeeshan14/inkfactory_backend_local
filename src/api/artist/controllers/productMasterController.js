const ApiError = require("../../../utils/error/genericError");
const services = require("../services/productMasterServices");

const createProduct = async (req, res, next) => {
    const { body } = req;
    const response = await services.createProduct(body);
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

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const response = await services.updateProduct(id, body);
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

const quickEditProduct = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body.productData;
    const response = await services.quickEditProduct(id, { title, description });
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

const updateVisibility = async (req, res, next) => {
    const { id } = req.params;
    const { viewVisibility } = req.body.productData;
    const response = await services.updateVisibility(id, { viewVisibility });
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

const updateConsent = async (req, res, next) => {
    const { id } = req.params;
    const { consent } = req.body.productData;
    const response = await services.updateConsent(id, { consent });
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

const getAllProducts = async (req, res, next) => {
    const response = await services.getAllProducts();
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

const getProductById = async (req, res, next) => {
    const { id } = req.params;
    const response = await services.getProductById(id);
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

const getProductsByArtistId = async (req, res, next) => {
    const { artistId } = req.params;
    const response = await services.getProductsByArtistId(artistId);
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
    createProduct,
    updateProduct,
    quickEditProduct,
    updateVisibility,
    updateConsent,
    getAllProducts,
    getProductById,
    getProductsByArtistId
};
