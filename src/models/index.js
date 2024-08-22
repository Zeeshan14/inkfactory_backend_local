const User = require('../api/user/models/UserModel');
const Role = require('../api/user/models/RoleModel');
const Product = require('../api/product/models/productModel');
const Category = require('../api/category/models/categoryModel');
const Cart = require('../api/cart/models/cartModel');
const SubCategory = require('../api/category/models/subCategoryModel');
const Order = require('../api/order/models/orderModel');
const Menu = require('../api/menu/models/menuModel');
const MenuCategory = require('../api/menu/models/menuCategoryModel');
const Blog =require('../api/blogs/models/Blog.model');
const ProductImages =require('../api/product/models/productImagesModel')
const ProductColor =require('../api/product/models/productColor.modal')
const ProductSize =require('../api/product/models/productSize.modal')
const ProductType =require('../api/product/models/ProductType.model')
const ProductFinish =require('../api/product/models/ProductFinish.model')
const ProductOption =require('../api/product/models/ProductOptions.model')
const ProductCardImage =require('../api/product/models/ProductCardImage.model')
const ProductBusinessCard =require('../api/product/models/ProductBusinessCard.model')
const CartProduct =require('../api/cart/models/cartProducts');
const ProductMaterial =require('../api/product/models/productMaterial.model');
const Banner =require('../api/banners/models/banner.model');
const BannerProduct =require('../api/banners/models/bannerProduct.model');
const CategoryProduct =require('../api/product/models/CategoryProducts');
const SimilarProduct =require('../api/product/models/SimilarProducts');
const Status =require('./status.model');
const ShippingCost =require('../api/shipping/models/shippingCostModel');
const MenuCategorySubcategory = require('../api/menu/models/menuCategorySubcategory');
const ContactUs = require('../api/user/models/ContactUsModel');
//const Artist = require('../api/artist/models/artistModel');
const ProductMaster = require('../api/artist/models/ProductMasterModel');
const Collection = require('../api/artist/models/CollectionModel');
const ProductSetting = require('../api/artist/models/ProductSettingModel');
const ProductCreate = require('../api/artist/models/ProductCreate');
const ProductCategoryDetails = require('../api/artist/models/ProductCategoryDetails');
const ProductEditor = require('../api/artist/models/ProductEditor');
require('./associations')
module.exports={
    User,
    ProductMaster,
    Collection,
    ProductSetting,
    Role,
    Product,
    Cart,
    Category,
    SubCategory,
    Order,
    Menu,
    MenuCategory,
    Blog,
    ProductImages,
    CartProduct,
    ProductColor,
    ProductSize,
    ProductMaterial,
    Status,
    Banner,
    BannerProduct,
    ProductType,
    ProductFinish,
    ProductCardImage,
    ProductOption,
    ProductBusinessCard,
    CategoryProduct,
    SimilarProduct,
    ShippingCost,
    MenuCategorySubcategory,
    ContactUs,
    ProductCreate,
    ProductCategoryDetails,
    ProductEditor,
    // Artist,
}