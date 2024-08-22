const ApiError = require("../../../utils/error/genericError");
const services = require("../services/collectionServices");

const createCollection = async (req, res, next) => {
    const { body } = req;
    const response = await services.createCollectionService(body);
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

const addProductToCollection = async (req, res, next) => {
    const  collectionId  = req.params.collectionId;
    console.log("bruh",req.params.collectionId);
    
    const { productId } = req.body; // Assuming productId is passed in the request body
    const response = await services.addProductToCollectionService(collectionId, productId);
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

const getProductsByCollection = async (req, res, next) => {
    const { collectionId } = req.params;
    const response = await services.getProductsByCollectionService(collectionId);
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
    createCollection,
    addProductToCollection,
    getProductsByCollection
};
