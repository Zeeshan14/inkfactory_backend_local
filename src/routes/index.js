const authRoutes = require('../api/auth/routes/authRoutes');
const productRoutes = require('../api/product/routes/productRoutes');
const categoryRoutes = require('../api/category/routes/categoryRoutes');
const menuRoutes = require('../api/menu/routes/menuRoutes');
const blogRoutes = require('../api/blogs/routes/blogRoutes');
const cartRoutes = require('../api/cart/routes/cart.routes');
const orderRoutes = require('../api/order/routes/order.routes');
const bannerRoute = require('../api/banners/routes/banner.routes');
const shippingCostRoute = require('../api/shipping/routes/shippingCostRoutes');
module.exports={
 authRoutes,
 productRoutes,
 categoryRoutes,
 menuRoutes,
 blogRoutes,
 cartRoutes,
 orderRoutes,
 bannerRoute,
 shippingCostRoute
}