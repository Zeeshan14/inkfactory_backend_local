const ProductCreate = require('../models/ProductCreate');
const ProductSetting = require('../models/ProductSettingModel');
const ProductCategoryDetails = require('../models/ProductCategoryDetails');
const Subcategory = require('../../category/models/subCategoryModel')
const Product = require('../../product/models/productModel')
const CategoryProduct = require('../../product/models/CategoryProducts')
const sequelize = require('../../../config/db');

// Function to create products and settings based on the 'isedited' flag
const createProductAndSettings = async (productData, productSettingsData) => {
    const transaction = await sequelize.transaction(); // Start a transaction
    let results;

    try {
        // Process each setting and store in ProductSetting, ProductCategoryDetails, and the new tables
        for (const setting of productSettingsData) {
            // Only proceed if isedited is true
            //if (!setting.isedited) continue;

            // Find subcategory_id by matching imgName with sub_category_title in the subcategories table
            const subcategory = await Subcategory.findOne({
                where: {
                    sub_category_title: sequelize.where(
                        sequelize.fn('LOWER', sequelize.col('sub_category_title')),
                        'LIKE',
                        `%${setting.imgName.toLowerCase()}%`
                    )
                }
            }, { transaction });

            if (!subcategory) {
                throw new Error(`Subcategory does not exist for imgName: ${setting.imgName}`);
            }

            // Create record in products table and retrieve the product ID
            const newProduct = await Product.create({
                product_title: productData.title,
                product_description: productData.description ?? null,
                product_long_description: productData.longDescription ?? null,
                product_image: setting.EditedImage,  // Use the edited image from the settings
                price: productData.price ?? 1.00,
                sale_price: productData.salePrice ?? 0,
                quantity: productData.quantity ?? 1,
                sku: productData.sku ?? null,
                sub_category_id: subcategory.id,
                min_buy_quantity: productData.minBuyQuantity ?? 1,
                is_featured: productData.isFeatured ?? false,
                print_location_enabled: productData.printLocationEnabled ?? false,
                is_business_card: productData.isBusinessCard ?? false,
                is_name_card: productData.isNameCard ?? false
            }, { transaction });

            // Insert into ProductCreate after retrieving the product ID
            await ProductCreate.create({
                title: productData.title,
                tags: productData.tags,
                description: productData.description,
                viewVisibility: productData.viewVisibility,
                consent: productData.consent,
                agreement: productData.agreement,
                artistid: productData.artistid,
                id: newProduct.id  // Link the product ID
            }, { transaction });

            // Create ProductSetting record
            const productSettingData = {
                isedited: setting.isedited,
                imgName: setting.imgName,
                Image: setting.Image,
                uniques: setting.uniques,
                position_x: setting.position?.x ?? null,
                position_y: setting.position?.y ?? null,
                horizontal_x: setting.horizontal?.x ?? null,
                horizontal_y: setting.horizontal?.y ?? null,
                vertical_x: setting.vertical?.x ?? null,
                vertical_y: setting.vertical?.y ?? null,
                sliderValue: setting.sliderValue,
                boundImage: setting.boundImage,
                disable: setting.disable === 0 ? false : true,
                bounds: setting.bounds,
                ImageHover: setting.ImageHover,
                variationId: setting.variationId,
                EditedImage: setting.EditedImage,
                productId: newProduct.id  // Link the product ID
            };
            results = newProduct;

            await ProductSetting.create(productSettingData, { transaction });

            // Create ProductCategoryDetails record
            await ProductCategoryDetails.create({
                artistid: productData.artistid,
                ProductCategory: setting.imgName,
                OriginalImage: setting.ImageHover,
                productId: newProduct.id,  // Link the product ID
                productImage: setting.EditedImage
            }, { transaction });

            // Create record in categoryproduct table
            await CategoryProduct.create({
                sub_category_id: subcategory.id,
                product_id: newProduct.id  // Link the product ID
            }, { transaction });
        }

        // Commit the transaction if everything was successful
        await transaction.commit();
        return { product: results };

    } catch (error) {
        // Rollback the transaction if any error occurs
        try {
            await transaction.rollback();
        } catch (rollbackError) {
            console.error('Transaction rollback failed:', rollbackError);
        }
        throw new Error(`Error creating product and settings: ${error.message}`);
    }
};



// const createProductAndSettings = async (productData, productSettingsData) => {
//     const transaction = await sequelize.transaction(); // Start a transaction
//     let results;

//     try {
//         // Process each setting and store in ProductSetting, ProductCategoryDetails, and the new tables
//         for (const setting of productSettingsData) {
//             // Only proceed if isedited is true (1)
//             if (!setting.isedited) continue;

//             // Find subcategory_id by matching imgName with sub_category_title in the subcategories table
//             const subcategory = await Subcategory.findOne({
//                 where: {
//                     sub_category_title: sequelize.where(
//                         sequelize.fn('LOWER', sequelize.col('sub_category_title')),
//                         'LIKE',
//                         `%${setting.imgName.toLowerCase()}%`
//                     )
//                 }
//             }, { transaction });

//             if (!subcategory) {
//                 throw new Error(`Subcategory does not exist for imgName: ${setting.imgName}`);
//             }

//             // Create record in products table and retrieve the product ID
//             const newProduct = await Product.create({
//                 product_title: productData.title,
//                 product_description: productData.description ?? null,
//                 product_long_description: productData.longDescription ?? null,
//                 product_image: setting.EditedImage,  // Use the edited image from the settings
//                 price: productData.price ?? 1.00,
//                 sale_price: productData.salePrice ?? 0,
//                 quantity: productData.quantity ?? 1,
//                 sku: productData.sku ?? null,
//                 sub_category_id: subcategory.id,
//                 min_buy_quantity: productData.minBuyQuantity ?? 1,
//                 is_featured: productData.isFeatured ?? false,
//                 print_location_enabled: productData.printLocationEnabled ?? false,
//                 is_business_card: productData.isBusinessCard ?? false,
//                 is_name_card: productData.isNameCard ?? false
//             }, { transaction });

//             // Insert into ProductCreate after retrieving the product ID
//             await ProductCreate.create({
//                 title: productData.title,
//                 tags: productData.tags,
//                 description: productData.description,
//                 viewVisibility: productData.viewVisibility,
//                 consent: productData.consent,
//                 agreement: productData.agreement,
//                 artistid: productData.artistid,
//                 id: newProduct.id  // Link the product ID
//             }, { transaction });

//             // Create ProductSetting record
//             const productSettingData = {
//                 isedited: setting.isedited,
//                 imgName: setting.imgName,
//                 Image: setting.Image,
//                 uniques: setting.uniques,
//                 position_x: setting.position?.x ?? null,
//                 position_y: setting.position?.y ?? null,
//                 horizontal_x: setting.horizontal?.x ?? null,
//                 horizontal_y: setting.horizontal?.y ?? null,
//                 vertical_x: setting.vertical?.x ?? null,
//                 vertical_y: setting.vertical?.y ?? null,
//                 sliderValue: setting.sliderValue,
//                 boundImage: setting.boundImage,
//                 disable: setting.disable === 0 ? false : true,
//                 bounds: setting.bounds,
//                 ImageHover: setting.ImageHover,
//                 variationId: setting.variationId,
//                 EditedImage: setting.EditedImage,
//                 productId: newProduct.id  // Link the product ID
//             };
//             results = newProduct;

//             await ProductSetting.create(productSettingData, { transaction });

//             // Create ProductCategoryDetails record
//             await ProductCategoryDetails.create({
//                 artistid: productData.artistid,
//                 ProductCategory: setting.imgName,
//                 OriginalImage: setting.ImageHover,
//                 productId: newProduct.id,  // Link the product ID
//                 productImage: setting.EditedImage
//             }, { transaction });

//             // Create record in categoryproduct table
//             await CategoryProduct.create({
//                 sub_category_id: subcategory.id,
//                 product_id: newProduct.id  // Link the product ID
//             }, { transaction });
//         }

//         // Commit the transaction if everything was successful
//         await transaction.commit();
//         return { product: results };

//     } catch (error) {
//         // Rollback the transaction if any error occurs
//         try {
//             await transaction.rollback();
//         } catch (rollbackError) {
//             console.error('Transaction rollback failed:', rollbackError);
//         }
//         throw new Error(`Error creating product and settings: ${error.message}`);
//     }
// };




const getProductsByArtistId = async (artistid) => {
    try {
        const products = await ProductCreate.findAll({
            where: { artistid },
            include: [
                {
                    model: ProductSetting,
                    as: 'ProductSetting'
                },
                {
                    model: ProductCategoryDetails,
                    as: 'ProductCategoryDetails'
                }
            ]
        });

        console.log('Products fetched:', JSON.stringify(products, null, 2));

        // Transform the response
        const response = products.map(product => ({
            productData: {
                title: product.title,
                tags: product.tags,
                description: product.description,
                viewVisibility: product.viewVisibility,
                consent: product.consent,
                agreement: product.agreement,
                artistid: product.artistid
            },
            productSettingsData: product.ProductSetting.map(setting => {
                return {
                    isedited: setting.isedited,
                    imgName: setting.imgName,
                    Image: setting.Image,
                    uniques: setting.uniques,
                    position: {
                        x: setting.position_x,
                        y: setting.position_y
                    },
                    horizontal: {
                        x: setting.horizontal_x,
                        y: setting.horizontal_y
                    },
                    vertical: {
                        x: setting.vertical_x,
                        y: setting.vertical_y
                    },
                    sliderValue: setting.sliderValue,
                    boundImage: setting.boundImage,
                    disable: setting.disable,
                    bounds: setting.bounds,
                    ImageHover: setting.ImageHover,
                    variationId: setting.variationId,
                    EditedImage: setting.EditedImage, // Check this field
                };
            })
        }));
        return response;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products');
    }
};


const getProductSettingsById = async (productid) => {
    try {
        console.log('productid:', productid)
        const products = await ProductCreate.findAll({
            where: { id : productid },
            include: [
                {
                    model: ProductSetting,
                    as: 'ProductSetting'
                },
                {
                    model: ProductCategoryDetails,
                    as: 'ProductCategoryDetails'
                }
            ]
        });

        console.log('Products fetched:', JSON.stringify(products, null, 2));

        // Transform the response
        const response = products.map(product => ({
            productData: {
                title: product.title,
                tags: product.tags,
                description: product.description,
                viewVisibility: product.viewVisibility,
                consent: product.consent,
                agreement: product.agreement,
                artistid: product.artistid
            },
            productSettingsData: product.ProductSetting.map(setting => {
                return {
                    isedited: setting.isedited,
                    imgName: setting.imgName,
                    Image: setting.Image,
                    uniques: setting.uniques,
                    position: {
                        x: setting.position_x,
                        y: setting.position_y
                    },
                    horizontal: {
                        x: setting.horizontal_x,
                        y: setting.horizontal_y
                    },
                    vertical: {
                        x: setting.vertical_x,
                        y: setting.vertical_y
                    },
                    sliderValue: setting.sliderValue,
                    boundImage: setting.boundImage,
                    disable: setting.disable,
                    bounds: setting.bounds,
                    ImageHover: setting.ImageHover,
                    variationId: setting.variationId,
                    EditedImage: setting.EditedImage, // Check this field
                };
            })
        }));
        return response;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products');
    }
};


module.exports = {
    createProductAndSettings,
    getProductsByArtistId,
    getProductSettingsById,
};
