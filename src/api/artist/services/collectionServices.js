const response = require("../../../utils/response/genericResponse");
const errorResponse = require("../../../utils/response/errorResponse");
const sequelize = require("../../../config/db");
const messages = require("../../../utils/constants/messages");
const status = require("http-status");
const { Collection, ProductMaster, ProductCreate,ProductCategoryDetails } = require("../../../models");

const createCollectionService = async (req) => {
  try {
    // const { name, description } = req.body;
    // const collection = await Collection.create({ name, description });
    const collection = await Collection.create(req);
    return response(messages.COLLECTION_CREATED, collection, true, status.CREATED);
  } catch (err) {
    return errorResponse();
  }
};

const addProductToCollectionService = async (collectionID, productID) => {
  try {
    const currentTime = new Date(); // Get the current time for createdAt and updatedAt

    // Direct SQL insert into the join table with timestamps
    await sequelize.query(
      `INSERT INTO CollectionProducts (collectionId, productId, createdAt, updatedAt) 
       VALUES (:collectionId, :productId, :createdAt, :updatedAt)`,
      {
        replacements: {
          collectionId: collectionID,
          productId: productID,
          createdAt: currentTime,
          updatedAt: currentTime,
        },
      }
    );

    return response(
      messages.PRODUCT_ADDED_TO_COLLECTION,
      { collectionID, productID },
      true,
      status.OK
    );
  } catch (err) {
    console.error(err);
    return errorResponse(
      messages.INTERNAL_SERVER_ERROR,
      {},
      false,
      status.INTERNAL_SERVER_ERROR
    );
  }
};

const getProductsByCollectionService = async (CollectionID) => {
  try {
    const  collectionId  = CollectionID;
    const collection = await Collection.findByPk(collectionId, {
      include: ProductCreate,
    });
    if (!collection) {
      return errorResponse(messages.COLLECTION_NOT_FOUND, {}, false, status.NOT_FOUND);
    }
    var ProductId;

    const productCreates = collection.ProductCreates;
    productCreates.forEach(product => {
      ProductId = product.CollectionProducts.productId;
});
    const productcatdetails = await ProductCategoryDetails.findAll({
      where: { productId: ProductId },
    })
    return response(messages.PRODUCTS_FETCHED_BY_COLLECTION, {collection,productcatdetails}, true, status.OK);
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};

module.exports = {
  createCollectionService,
  addProductToCollectionService,
  getProductsByCollectionService,
};
