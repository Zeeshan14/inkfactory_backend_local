const User = require("../api/user/models/UserModel");
//const Artist = require("../api/artist/models/ArtistModel");
const Role = require("../api/user/models/RoleModel");
const Category = require("../api/category/models/categoryModel");
const SubCategory = require("../api/category/models/subCategoryModel");
const Product = require("../api/product/models/productModel");
const Menu = require("../api/menu/models/menuModel");
const MenuCategory = require("../api/menu/models/menuCategoryModel");
const Cart = require("../api/cart/models/cartModel");
const CartProduct = require("../api/cart/models/cartProducts");
const ProductColor = require("../api/product/models/productColor.modal");
const ProductSize = require("../api/product/models/productSize.modal");
const Order = require("../api/order/models/orderModel");
const ProductImages = require("../api/product/models/productImagesModel");
const ProductMaterial = require("../api/product/models/productMaterial.model");
const BannerProduct = require("../api/banners/models/bannerProduct.model");
const Banner = require("../api/banners/models/banner.model");
const ProductType = require("../api/product/models/ProductType.model");
const ProductFinish = require("../api/product/models/ProductFinish.model");
const ProductCardImage = require("../api/product/models/ProductCardImage.model");
const ProductOption = require("../api/product/models/ProductOptions.model");
const ProductBusinessCard = require("../api/product/models/ProductBusinessCard.model");
const CategoryProduct = require("../api/product/models/CategoryProducts");
const SimilarProduct = require("../api/product/models/SimilarProducts");
const MenuCategorySubcategory = require("../api/menu/models/menuCategorySubcategory");
const ContactUs = require("../api/user/models/ContactUsModel");
const ProductMaster = require("../api/artist/models/ProductMasterModel");
const Collection = require("../api/artist/models/CollectionModel");
const ProductCreate = require("../api/artist/models/ProductCreate");
const ProductCategoryDetails = require("../api/artist/models/ProductCategoryDetails");
const ProductSetting = require("../api/artist/models/ProductSettingModel");
User.belongsTo(Role, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Role.hasMany(User, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(ContactUs,{
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
ContactUs.belongsTo(User,{
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
User.hasMany(Order,{
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Order.belongsTo(User,{
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Cart.hasOne(Order,{
  foreignKey: "cart_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Order.belongsTo(Cart,{
  foreignKey: "cart_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Cart.belongsTo(User,{
  foreignKey:"user_id",
  onDelete:"CASCADE"
});
User.hasMany(Cart,{
  foreignKey:"user_id",
  onDelete:"CASCADE"
})
Category.hasMany(SubCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
SubCategory.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
SubCategory.hasMany(Product, {
  foreignKey: "sub_category_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(SubCategory, {
  foreignKey: "sub_category_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
// ========================================== Artist Category =================================== //

// ========================================== Artist Category =================================== //

// ========================================== Menu Category ====================================
Menu.belongsToMany(Category, {
  through: MenuCategory,
  foreignKey: "menu_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Category.belongsToMany(Menu, {
  through: MenuCategory,
  foreignKey: "category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Menu.hasMany(MenuCategory, {
  foreignKey: "menu_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
MenuCategory.belongsTo(Menu, {
  foreignKey: "menu_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
MenuCategory.belongsTo(Category, {
  foreignKey: "category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Category.hasMany(MenuCategory, {
  foreignKey: "category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
//  Menu Category Sub category

MenuCategory.belongsToMany(SubCategory,{
  through: MenuCategorySubcategory,
  foreignKey: "menu_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
})
SubCategory.belongsToMany(MenuCategory,{
  through: MenuCategorySubcategory,
  foreignKey: "menu_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
})
SubCategory.hasMany(MenuCategorySubcategory,{
  foreignKey: "sub_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
})
MenuCategorySubcategory.belongsTo(SubCategory,{
  foreignKey: "sub_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
})
MenuCategory.hasMany(MenuCategorySubcategory,{
  foreignKey: "menu_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
})
MenuCategorySubcategory.belongsTo(MenuCategory,{
  foreignKey: "menu_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
})

// ========================================== Cart Product ======================================//
Cart.belongsToMany(Product, {
  through: CartProduct,
  foreignKey: "cart_id",
  onDelete: "CASCADE",
  onUpdate:"CASCADE",
});
Product.belongsToMany(Cart, {
  through: CartProduct,
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate:"CASCADE",
});
Cart.hasMany(ProductBusinessCard,{
  foreignKey:"cart_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductBusinessCard.belongsTo(Cart,{
  foreignKey:"cart_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Cart.hasMany(CartProduct,{
  foreignKey:"cart_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(Cart,{
  foreignKey:"cart_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})

Product.hasMany(CartProduct,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductSize.hasMany(CartProduct,{
  foreignKey:"product_size_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(ProductSize,{
  foreignKey:"product_size_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductMaterial.hasMany(CartProduct,{
  foreignKey:"product_material_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(ProductMaterial,{
  foreignKey:"product_material_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductColor.hasMany(CartProduct,{
  foreignKey:"product_color_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(ProductColor,{
  foreignKey:"product_color_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductFinish.hasMany(CartProduct,{
  foreignKey:"product_finish_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(ProductFinish,{
  foreignKey:"product_finish_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductType.hasMany(CartProduct,{
  foreignKey:"product_type_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(ProductType,{
  foreignKey:"product_type_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductOption.hasMany(CartProduct,{
  foreignKey:"product_option_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
CartProduct.belongsTo(ProductOption,{
  foreignKey:"product_option_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
// ========================================== Product =======================================
Product.hasMany(ProductImages,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductImages.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductColor,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductColor.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductSize,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductSize.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductMaterial,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductMaterial.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductType,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductType.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductFinish,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductFinish.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductCardImage,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductCardImage.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductOption,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductOption.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(ProductBusinessCard,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
ProductBusinessCard.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
//================================== Banner ================================//
Banner.hasMany(BannerProduct,{
  foreignKey:"banner_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
BannerProduct.belongsTo(Banner,{
  foreignKey:"banner_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
Product.hasMany(BannerProduct,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
BannerProduct.belongsTo(Product,{
  foreignKey:"product_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE",
})
// ========================================== Category Products ================================//
SubCategory.belongsToMany(Product, {
  through: CategoryProduct,
  foreignKey: "sub_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Product.belongsToMany(SubCategory, {
  through: CategoryProduct,
  foreignKey: "product_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
SubCategory.hasMany(CategoryProduct, {
  foreignKey: "sub_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
CategoryProduct.belongsTo(SubCategory, {
  foreignKey: "sub_category_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
CategoryProduct.belongsTo(Product, {
  foreignKey: "product_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Product.hasMany(CategoryProduct, {
  foreignKey: "product_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
//  self reference
Product.belongsToMany(Product, { 
  through: SimilarProduct,
  as:"similar",
  foreignKey: "product_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Product.belongsToMany(Product, { 
  through: SimilarProduct,
  as:"parent",
  foreignKey: "similar_product_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

ProductCreate.belongsToMany(Collection, { through: 'CollectionProducts', foreignKey: 'productId' });
Collection.belongsToMany(ProductCreate, { through: 'CollectionProducts', foreignKey: 'collectionId' });

ProductCreate.hasMany(ProductSetting, { as: 'ProductSetting', foreignKey: 'productId' });
ProductCreate.hasMany(ProductCategoryDetails, { as: 'ProductCategoryDetails', foreignKey: 'productId' });

// Define associations
User.hasMany(ProductCreate, {
  foreignKey: 'artistid',
  as: 'products'
});

ProductCreate.belongsTo(User, {
  foreignKey: 'artistid',
  as: 'artist'
});
