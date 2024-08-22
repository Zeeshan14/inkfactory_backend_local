const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const messages = require("../../../utils/constants/messages");
const { ProductMaster, ProductCreate, ProductSetting,ProductCategoryDetails } = require("../../../models");
const errorResponse = require("../../../utils/response/errorResponse");
const Subcategory = require('../../category/models/subCategoryModel')
const Product = require('../../product/models/productModel')
const CategoryProduct = require('../../product/models/CategoryProducts')
const sequelize = require('../../../config/db');
const { Op } = require('sequelize');

const createProduct = async (productData) => {
    try {
        const newProduct = await ProductMaster.create(productData);
        return response(messages.PRODUCT_CREATED, newProduct, true, status.CREATED);
    } catch (err) {
        return errorResponse();
    }
};


const updateProduct = async (artist_id, productData) => {
    const transaction = await sequelize.transaction(); // Start a transaction

    try {
        // Retrieve all product IDs by artist ID from ProductCreate
        const products = await ProductCreate.findAll({
            where: {
                artistid: artist_id,
                title: {
                    [Op.like]: `%${productData.productData.title}%`
                },
                tags: {
                    [Op.like]: `%${productData.productData.tags}%`
                }
            },
            attributes: ['id'], // Only retrieve the product IDs
            transaction
        });

        if (!products.length) {
            await transaction.rollback();
            return errorResponse("No products found for the given artist ID", {}, false, status.NOT_FOUND);
        }

        // Iterate through each product and perform the update
        for (let i = 0; i < products.length; i++) {
            const productId = products[i].id; // Extract product ID
            const setting = productData.productSettingsData[i]; // Corresponding setting
            const imgName = setting.imgName; // Image name for matching

            // Update the product in ProductCreate
            const [updateCount] = await ProductCreate.update(productData.productData, {
                where: { id: productId },
                transaction
            });

            if (updateCount === 0) {
                await transaction.rollback();
                return errorResponse(`Product not found for ID: ${productId}`, {}, false, status.NOT_FOUND);
            }

            // Update the ProductSetting table
            const existingSetting = await ProductSetting.findOne({
                where: { productId, imgName },
                transaction
            });

            if (existingSetting) {
                await ProductSetting.update({
                    ...setting,
                    position_x: setting.position?.x ?? null,
                    position_y: setting.position?.y ?? null,
                    horizontal_x: setting.horizontal?.x ?? null,
                    horizontal_y: setting.horizontal?.y ?? null,
                    vertical_x: setting.vertical?.x ?? null,
                    vertical_y: setting.vertical?.y ?? null,
                }, {
                    where: { productId, imgName },
                    transaction
                });
            }

            // Update the ProductCategoryDetails table
            const existingCategoryDetails = await ProductCategoryDetails.findOne({
                where: { productId, ProductCategory: imgName },
                transaction
            });

            if (existingCategoryDetails) {
                await ProductCategoryDetails.update({
                    artistid: artist_id,
                    ProductCategory: imgName,
                    OriginalImage: setting.ImageHover,
                    productImage: setting.EditedImage
                }, {
                    where: { productId, ProductCategory: imgName },
                    transaction
                });
            }

            // Find the subcategory by matching imgName with sub_category_title
            const subcategory = await Subcategory.findOne({
                where: {
                    sub_category_title: sequelize.where(
                        sequelize.fn('LOWER', sequelize.col('sub_category_title')),
                        'LIKE',
                        `%${imgName.toLowerCase()}%`
                    )
                },
                transaction
            });

            if (!subcategory) {
                throw new Error(`Subcategory does not exist for imgName: ${imgName}`);
            }

            // Update the Product table
            await Product.update({
                product_title: productData.productData.title,
                product_description: productData.productData.description ?? null,
                product_long_description: productData.productData.longDescription ?? null,
                product_image: setting.EditedImage ?? null,
                price: productData.productData.price ?? 1.00,
                sale_price: productData.productData.salePrice ?? 0,
                quantity: productData.productData.quantity ?? 1,
                sku: productData.productData.sku ?? null,
                sub_category_id: subcategory.id,
                min_buy_quantity: productData.productData.minBuyQuantity ?? 1,
                is_featured: productData.productData.isFeatured ?? false,
                print_location_enabled: productData.productData.printLocationEnabled ?? false,
                is_business_card: productData.productData.isBusinessCard ?? false,
                is_name_card: productData.productData.isNameCard ?? false
            }, {
                where: { id: productId },
                transaction
            });

            // Update CategoryProduct table
            await CategoryProduct.update({
                sub_category_id: subcategory.id
            }, {
                where: { product_id: productId },
                transaction
            });
        }

        // Commit the transaction if everything was successful
        await transaction.commit();
        return response(messages.PRODUCT_UPDATED, products, true, status.OK);

    } catch (err) {
        // Rollback the transaction if any error occurs
        await transaction.rollback();
        console.log(err);
        return errorResponse(`Error updating products: ${err.message}`);
    }
};






// const updateProduct = async (artist_id, productData) => {
//     const transaction = await sequelize.transaction(); // Start a transaction

//     try {
//         // Retrieve all product IDs by artist ID from ProductCreate
//         const products = await ProductCreate.findAll({
//             where: {
//                 artistid: artist_id,
//                 title: {
//                     [Op.like]: `%${productData.productData.title}%`
//                 },
//                 tags: {
//                     [Op.like]: `%${productData.productData.tags}%`
//                 }
//             },
//             attributes: ['id'], // Only retrieve the product IDs
//             transaction
//         });

//         if (!products.length) {
//             await transaction.rollback();
//             return errorResponse("No products found for the given artist ID", {}, false, status.NOT_FOUND);
//         }

//         // Iterate through each product and perform the update
//         for (const product of products) {
//             const productId = product.id; // Extract product ID

//             // Update the product in ProductCreate
//             const [updateCount] = await ProductCreate.update(productData.productData, {
//                 where: { id: productId },
//                 transaction
//             });

//             if (updateCount === 0) {
//                 await transaction.rollback();
//                 return errorResponse(`Product not found for ID: ${productId}`, {}, false, status.NOT_FOUND);
//             }

//             // Update existing records in ProductSetting and ProductCategoryDetails
//             for (const setting of productData.productSettingsData) {
//                 // Check if the setting record exists
//                 const existingSetting = await ProductSetting.findOne({
//                     where: { productId, imgName: setting.imgName },
//                     transaction
//                 });

//                 if (existingSetting) {
//                     // Update existing ProductSetting record
//                     await ProductSetting.update({
//                         ...setting,
//                         position_x: setting.position?.x ?? null,
//                         position_y: setting.position?.y ?? null,
//                         horizontal_x: setting.horizontal?.x ?? null,
//                         horizontal_y: setting.horizontal?.y ?? null,
//                         vertical_x: setting.vertical?.x ?? null,
//                         vertical_y: setting.vertical?.y ?? null,
//                     }, {
//                         where: { productId, imgName: setting.imgName },
//                         transaction
//                     });
//                 } else {
//                     // Optionally handle case where setting does not exist
//                     console.log(`Setting not found for productId: ${productId}, imgName: ${setting.imgName}`);
//                 }

//                 // Check if the ProductCategoryDetails record exists
//                 const existingCategoryDetails = await ProductCategoryDetails.findOne({
//                     where: { productId, ProductCategory: setting.imgName },
//                     transaction
//                 });

//                 if (existingCategoryDetails) {
//                     // Update existing ProductCategoryDetails record
//                     await ProductCategoryDetails.update({
//                         artistid: artist_id,
//                         ProductCategory: setting.imgName,
//                         OriginalImage: setting.ImageHover,
//                         productImage: setting.EditedImage
//                     }, {
//                         where: { productId, ProductCategory: setting.imgName },
//                         transaction
//                     });
//                 } else {
//                     // Optionally handle case where category details do not exist
//                     console.log(`Category details not found for productId: ${productId}, ProductCategory: ${setting.imgName}`);
//                 }
//             }

//             // Find the subcategory by matching imgName with sub_category_title
//             const subcategory = await Subcategory.findOne({
//                 where: {
//                     sub_category_title: sequelize.where(
//                         sequelize.fn('LOWER', sequelize.col('sub_category_title')),
//                         'LIKE',
//                         `%${productData.productSettingsData[0].imgName.toLowerCase()}%`
//                     )
//                 },
//                 transaction
//             });

//             if (!subcategory) {
//                 throw new Error(`Subcategory does not exist for imgName: ${productData.productSettingsData[0].imgName}`);
//             }

//             // Update the Product table
//             await Product.update({
//                 product_title: productData.productData.title,
//                 product_description: productData.productData.description ?? null,
//                 product_long_description: productData.productData.longDescription ?? null,
//                 product_image: productData.productSettingsData[0]?.EditedImage ?? null,
//                 price: productData.productData.price ?? 1.00,
//                 sale_price: productData.productData.salePrice ?? 0,
//                 quantity: productData.productData.quantity ?? 1,
//                 sku: productData.productData.sku ?? null,
//                 sub_category_id: subcategory.id,
//                 min_buy_quantity: productData.productData.minBuyQuantity ?? 1,
//                 is_featured: productData.productData.isFeatured ?? false,
//                 print_location_enabled: productData.productData.printLocationEnabled ?? false,
//                 is_business_card: productData.productData.isBusinessCard ?? false,
//                 is_name_card: productData.productData.isNameCard ?? false
//             }, {
//                 where: { id: productId },
//                 transaction
//             }); 

//             // Update CategoryProduct table
//             await CategoryProduct.update({
//                 sub_category_id: subcategory.id
//             }, {
//                 where: { product_id: productId },
//                 transaction
//             });
//         }

//         // Commit the transaction if everything was successful
//         await transaction.commit();
//         return response(messages.PRODUCT_UPDATED, products, true, status.OK);

//     } catch (err) {
//         // Rollback the transaction if any error occurs
//         await transaction.rollback();
//         console.log(err);
//         return errorResponse(`Error updating products: ${err.message}`);
//     }
// };









const quickEditProduct = async (id, { title, description }) => {
    try {
        const updatedProduct = await ProductCreate.update({ title, description }, {
            where: { id },
            returning: true
        });
        const updatedProduct2 = await Product.update({ product_title: title, product_description: description }, {
            where: { id },
            returning: true
        });
        if (updatedProduct[0] === 0) {
            return errorResponse("Product not found", {}, false, status.NOT_FOUND);
        }
        return response(messages.PRODUCT_QUICK_UPDATED, updatedProduct[1][0], true, status.OK);
    } catch (err) {
        return errorResponse();
    }
};

const updateVisibility = async (id, { viewVisibility }) => {
    try {
        const updatedProduct = await ProductCreate.update({ viewVisibility }, {
            where: { id },
            returning: true
        });
        if (updatedProduct[0] === 0) {
            return errorResponse("Product not found", {}, false, status.NOT_FOUND);
        }
        return response(messages.PRODUCT_VISIBILITY_UPDATED, updatedProduct[1][0], true, status.OK);
    } catch (err) {
        return errorResponse();
    }
};

const updateConsent = async (id, { consent }) => {
    try {
        const updatedProduct = await ProductCreate.update({ consent }, {
            where: { id },
            returning: true
        });
        if (updatedProduct[0] === 0) {
            return errorResponse("Product not found", {}, false, status.NOT_FOUND);
        }
        return response(messages.PRODUCT_CONSENT_UPDATED, updatedProduct[1][0], true, status.OK);
    } catch (err) {
        return errorResponse();
    }
};

const getAllProducts = async () => {
    try {
        const products = await ProductCreate.findAll();
        const productCategoryDetails = await ProductCategoryDetails.findAll();
        const result = { products, productCategoryDetails };

        return response(messages.PRODUCTS_FETCHED, result, true, status.OK);
    } catch (err) {
        return errorResponse();
    }
};

const getProductById = async (id) => {
    try {
        const product = await ProductCreate.findByPk(id);
        const productCategoryDetails = await ProductCategoryDetails.findAll({ where: { productId: id } });
        const result = { product, productCategoryDetails };
        if (!product) {
            return errorResponse("Product not found", {}, false, status.NOT_FOUND);
        }
        return response(messages.PRODUCT_FETCHED, result, true, status.OK);
    } catch (err) {
        console.log(err);
        return errorResponse();
    }
};

const getProductsByArtistId = async (artistId) => {
    try {
        const products = await ProductCreate.findAll({
            where: { artistId }
        });
        return response(messages.PRODUCTS_FETCHED_BY_ARTIST, products, true, status.OK);
    } catch (err) {
        return errorResponse();
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