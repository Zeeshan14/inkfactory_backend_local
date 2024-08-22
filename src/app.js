require("dotenv").config();
require('./models/associations');
const express = require("express");
const sequelize = require("./config/db");
const status = require("http-status");
const messages = require("./utils/constants/messages");
const ApiError = require("../src/utils/error/genericError");
const userRoutes = require("../src/api/user/routes/userRoutes");
const productSettingRoutes = require("../src/api/artist/routes/productSettingRoutes");
const productMasterRoutes = require("../src/api/artist/routes/productMasterRoutes");
const collectionRoutes = require("../src/api/artist/routes/collectionRoutes");
const productCreateRoutes = require("../src/api/artist/routes/productRoutes");
const productEditRoutes = require("../src/api/artist/routes/productEditorRoutes");
const bodyParser = require('body-parser');


const { authRoutes,productRoutes,categoryRoutes,menuRoutes,blogRoutes,cartRoutes,orderRoutes,bannerRoute,shippingCostRoute } = require("./routes/index");
const passport = require("passport");
// const jwtStrategy = require("./config/passport");
const app = express();
const cors = require('cors');
var path = require('path');
const morgan = require("morgan");
const req = require("express/lib/request");
global.appRoot = path.resolve(__dirname);
const fs = require('fs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:"500mb"}));
app.use(cors({
  origin:"*"
}));
app.use(morgan('tiny'))
app.use("/api/uploads", express.static("uploads"));


const connectionWithDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected with db successfully");
  } catch (err) {
    console.log(err)
    console.log("DB connection unsuccessfull");
  }
};
connectionWithDB();

app.get("/",(req,res)=>{
  res.send( "<h1>Welcome to e-commerce api</h1>");
});
app.use("/api/user", userRoutes);
app.use("/api/productSetting", productSettingRoutes);
app.use("/api/productMaster", productMasterRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/banner", bannerRoute);
app.use("/api/shippingCost", shippingCostRoute);
app.use("/api/productCreate",  productCreateRoutes);
app.use("/api/productEdit", productEditRoutes);


// passport.use(jwtStrategy());

app.use((req, res, next) => {
  throw new ApiError(messages.NOT_FOUND, status.NOT_FOUND);
});
// app.use((error, req, res, next) => {
//   return res.status(error.status).json({
//     message: error.message,
//     success: false,
//     data: {},
//   });                      
// });
try {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }
} catch (err) {
  console.error(err);
}
module.exports = app;

// // Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

