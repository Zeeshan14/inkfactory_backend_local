const response = require('../../../utils/response/genericResponse');
const status = require('http-status');
const messages = require('../../../utils/constants/messages');
const { Collection, ProductMaster } = require('../../../models');
const errorResponse = require('../../../utils/response/errorResponse');

const createCollection = async (req) => {
    try {
        const collection = await Collection.create(req.body);
        return response(messages.COLLECTION_CREATED, collection, true, status.CREATED);
    } catch (err) {
        return errorResponse();
    }
};

const addProductToCollection = async (req) => {
    try {
        const { collectionId } = req.params;
        const collection = await Collection.findByPk(collectionId);
        if (!collection) {
            return errorResponse(messages.COLLECTION_NOT_FOUND, {}, false, status.NOT_FOUND);
        }
        const product = await ProductMaster.findByPk(req.body.productId);
        if (!product) {
            return errorResponse(messages.PRODUCT_NOT_FOUND, {}, false, status.NOT_FOUND);
        }
        await collection.addProduct(product);
        return response(messages.PRODUCT_ADDED_TO_COLLECTION, {}, true, status.OK);
    } catch (err) {
        return errorResponse();
    }
};

const getProductsByCollection = async (req) => {
    try {
        const { collectionId } = req.params;
        const collection = await Collection.findByPk(collectionId, {
            include: ProductMaster,
        });
        if (!collection) {
            return errorResponse(messages.COLLECTION_NOT_FOUND, {}, false, status.NOT_FOUND);
        }
        return response(messages.PRODUCTS_FETCHED_BY_COLLECTION, collection.Products, true, status.OK);
    } catch (err) {
        return errorResponse();
    }
};

module.exports = {
    createCollection,
    addProductToCollection,
    getProductsByCollection,
};
