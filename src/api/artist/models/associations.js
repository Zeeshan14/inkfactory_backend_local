// models/associations.js

// const ProductMaster = require('./ProductMasterModel');
// const ProductCreate = require('./ProductCreate');
// const ProductCategoryDetails = require('./ProductCategoryDetails');
// const ProductSetting = require('./ProductSettingModel');
// const Collection = require('./CollectionModel');

// // Define associations
// ProductMaster.belongsToMany(Collection, { through: 'CollectionProducts', foreignKey: 'productId' });
// Collection.belongsToMany(ProductMaster, { through: 'CollectionProducts', foreignKey: 'collectionId' });

// ProductCreate.hasMany(ProductSetting, { as: 'productSettings', foreignKey: 'productId' });
// ProductCreate.hasMany(ProductCategoryDetails, { as: 'productCategoryDetails', foreignKey: 'productId' });

// module.exports = {
//   ProductMaster,
//   Collection,
//   ProductCreate
// };
