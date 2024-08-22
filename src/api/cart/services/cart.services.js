const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const fs = require("fs");
const { Op, Sequelize } = require("sequelize");
const {
  Category,
  SubCategory,
  Cart,
  CartProduct,
  Product,
  ProductColor,
  ProductSize,
  ProductMaterial,
  ProductFinish,
  ProductType,
  ProductOption,
  ProductBusinessCard,
} = require("../../../models/index");
const messages = require("../../../utils/constants/messages");
const errorResponse = require("../../../utils/response/errorResponse");
const addToCart = async (req) => {
  try {
    const {
      products,
      product_color,
      product_material,
      product_size,
      product_option,
      product_type,
      product_finish,
      company_name,
      designation,
      phone_number,
      email_address,
      website,
      cartAmount,
    } = req.body;
    let productExist = [];
    let productNotExist = [];
    const productExists = await Product.findOne({
      where: {
        id: products,
      },
    });
    if (!productExists) {
      return errorResponse("Product not found", {}, false, 400);
    }
    const cartExist = await Cart.findOne({
      where: {
        user_id: req.user.id,
        status: "pending",
      },
    });

    if (!cartExist) {
      const newCart = await Cart.create({
        user_id: req.user.id,
        amount:
          parseFloat(cartAmount) * parseFloat(productExists.min_buy_quantity),
      });
      await CartProduct.create({
        cart_id: newCart.id,
        product_id: products,
        qty: productExists.min_buy_quantity,
        product_color_id: product_color ? product_color : null,
        product_material_id: product_material ? product_material : null,
        product_size_id: product_size ? product_size : null,
        product_option_id: product_option ? product_option : null,
        product_type_id: product_type ? product_type : null,
        product_finish_id: product_finish ? product_finish : null,
        product_amount: cartAmount,
      });
      if (company_name) {
        await ProductBusinessCard.create({
          company_name,
          designation,
          phone_number,
          email_address,
          website,
          product_id: products,
          cart_id: newCart.id,
        });
      }
    } else {
      const cartProductExist = await CartProduct.findOne({
        where: {
          cart_id: cartExist.id,
          product_id: products,
        },
      });
      if (!cartProductExist) {
        await CartProduct.create({
          cart_id: cartExist.id,
          product_id: products,
          qty: productExists.min_buy_quantity,
          product_color_id: product_color ? product_color : null,
          product_material_id: product_material ? product_material : null,
          product_size_id: product_size ? product_size : null,
          product_option_id: product_option ? product_option : null,
          product_type_id: product_type ? product_type : null,
          product_finish_id: product_finish ? product_finish : null,
          product_amount: cartAmount,
        });
        if (company_name) {
          await ProductBusinessCard.create({
            company_name,
            designation,
            phone_number,
            email_address,
            website,
            product_id: products,
            cart_id: cartExist.id,
          });
        }
        await cartExist.increment("amount", {
          by:
            parseFloat(cartAmount) * parseFloat(productExists.min_buy_quantity),
        });
      } else {
        await cartProductExist.increment("qty");
        await cartProductExist.update({
          product_color_id: product_color ? product_color : null,
          product_material_id: product_material ? product_material : null,
          product_size_id: product_size ? product_size : null,
          product_option_id: product_option ? product_option : null,
          product_type_id: product_type ? product_type : null,
          product_finish_id: product_finish ? product_finish : null,
          product_amount: cartAmount,
        });
        await cartExist.increment("amount", { by: cartAmount });
      }
    }
    return response("Add to Cart successfully", {}, true, status.OK);

    // const cartExist = await Cart.findOne({
    //   where: {
    //     user_id: req.user.id,
    //     status: "pending",
    //   },
    // });
    // const allProducts = await Product.findAll({
    //   where: {
    //     id: products,
    //   },
    // });
    // const singleProduct = await Product.findOne({
    //   where: {
    //     id: products,
    //   },
    // });

    // if (cartExist) {
    //   const cartProductExist = await CartProduct.findAll({
    //     where: {
    //       cart_id: cartExist.id,
    //       product_id: products,
    //     },
    //   });
    //   products.forEach((element) => {
    //     if (cartProductExist.length == 0) {
    //       productNotExist.push({
    //         cart_id: cartExist.id,
    //         product_id: element,
    //         product_color_id: product_color,
    //         product_material_id: product_material,
    //         product_size_id: product_size,
    //       });
    //     }
    //     cartProductExist.forEach((cartProduct) => {
    //       if (element == cartProduct.product_id) {
    //         productExist.push(element);
    //       } else {
    //         productNotExist.push({
    //           cart_id: cartExist.id,
    //           product_id: element,
    //           product_color_id: product_color,
    //           product_material_id: product_material,
    //           product_size_id: product_size,
    //         });
    //       }
    //     });
    //   });
    //   await CartProduct.bulkCreate(productNotExist);
    //   await CartProduct.increment("qty", {
    //     where: { cart_id: cartExist.id, product_id: productExist },
    //   });

    //   const updatedCart = await Cart.findOne({
    //     where: {
    //       user_id: req.user.id,
    //       status: "pending",
    //     },
    //     include: {
    //       model: CartProduct,
    //       include: [
    //         Product,
    //         ProductColor,
    //         ProductSize,
    //         ProductMaterial,
    //         ProductFinish,
    //         ProductType,
    //         ProductOption,
    //       ],
    //     },
    //   });

    //   let productAmountArray = updatedCart.CartProducts.map((element) => {
    //     let colorPrice = element.ProductColor
    //       ? element.ProductColor.product_color_price
    //       : 0;
    //     let sizePrice = element.ProductSize
    //       ? element.ProductSize.product_size_price
    //       : 0;
    //     let materialPrice = element.ProductMaterial
    //       ? element.ProductMaterial.product_material_price
    //       : 0;
    //     let finishPrice = element.ProductFinish
    //       ? element.ProductFinish.product_finish_price
    //       : 0;
    //     let typePrice = element.ProductType
    //       ? element.ProductType.product_type_price
    //       : 0;
    //     let opionPrice = element.ProductOption
    //       ? element.ProductOption.product_option_price
    //       : 0;
    //     return (
    //       parseInt(element.Product.price) * parseInt(element.qty) +
    //       (colorPrice +
    //         sizePrice +
    //         materialPrice +
    //         finishPrice +
    //         typePrice +
    //         opionPrice)
    //     );
    //   });
    //   let totalAmountOfCart = productAmountArray.reduce((acc, cv) => {
    //     return acc + cv;
    //   }, 0);
    //   await updatedCart.update({ amount: cartAmount });
    // } else {
    //   const newCart = await Cart.create({
    //     user_id: req.user.id,
    //     amount: cartAmount,
    //   });
    //   let cartProductsArray = products.map((element) => {
    //     return {
    //       cart_id: newCart.id,
    //       product_id: parseInt(element),
    //       qty: 1,
    //     };
    //   });
    //   await CartProduct.bulkCreate(cartProductsArray);
    //   if (company_name) {
    //     await ProductBusinessCard.create({
    //       company_name,
    //       designation,
    //       phone_number,
    //       email_address,
    //       website,
    //     });
    //   }
    // }
    // return response("Add to Cart successfully", {}, true, status.OK);
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
const cartProductIncrement = async (req) => {
  try {
    const { cart_id, product_id, increment } = req.body;
    const cartDetail = await Cart.findByPk(cart_id);
    const cartProductDetail = await CartProduct.findOne({
      where: {
        cart_id,
        product_id,
      },
      include: [Product, ProductColor, ProductSize, ProductMaterial],
    });
    let variationsAmount = 0;
    if (cartProductDetail.ProductColor) {
      variationsAmount =
        variationsAmount +
        cartProductDetail.ProductColor.product_color_price *
          cartProductDetail.qty;
    }
    if (cartProductDetail.ProductSize) {
      variationsAmount =
        variationsAmount +
        cartProductDetail.ProductSize.product_size_price *
          cartProductDetail.qty;
    }
    if (cartProductDetail.ProductMaterial) {
      variationsAmount =
        variationsAmount +
        cartProductDetail.ProductMaterial.product_material_price *
          cartProductDetail.qty;
    }
    const totalVariationAmount = cartProductDetail?.Product?.sale_price
      ? cartProductDetail?.Product?.sale_price * cartProductDetail.qty +
        variationsAmount
      : cartProductDetail?.Product?.price * cartProductDetail.qty +
        variationsAmount;
    const productDetail = await Product.findByPk(product_id);

    if (increment) {
      await CartProduct.increment("qty", {
        where: { cart_id: cart_id, product_id: product_id },
      });
      // await cartDetail.increment("amount", {
      //   by: productDetail?.sale_price
      //     ? productDetail?.sale_price
      //     : productDetail?.price,
      // });
      await cartDetail.increment("amount", {
        by: totalVariationAmount,
      });
    } else {
      const cartProduct = await CartProduct.findOne({
        where: {
          cart_id: cart_id,
          product_id: product_id,
        },
      });
      if (cartProduct?.qty == 1) {
        return errorResponse("Min quantity must be 1", {}, false, 400);
      }
      await CartProduct.decrement("qty", {
        where: { cart_id: cart_id, product_id: product_id },
      });
      // await cartDetail.decrement("amount", {
      //   by: productDetail?.sale_price
      //     ? productDetail?.sale_price
      //     : productDetail?.price,
      // });
      await cartDetail.decrement("amount", {
        by: totalVariationAmount,
      });
    }
    return response("Added successfully", {}, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const getCartDetail = async (req) => {
  try {
    const getCart = await Cart.findOne({
      where: {
        user_id: req.user.id,
        status: "pending",
      },
      include: {
        model: CartProduct,
        include: [
          {
            model: Product,
            include: [
              {
                model: Product,
                as: "similar",
              },
              {
                model: SubCategory,
                include: [
                  {
                    model: Category,
                  },
                ],
              },
            ],
          },
          ProductColor,
          ProductSize,
          ProductMaterial,
          ProductFinish,
          ProductOption,
          ProductType,
        ],
      },
    });
    return response("Cart fetched successfully", getCart, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};
const removeProductFromCart = async (req) => {
  try {
    const { id } = req.params;
    const cartProductDetail = await CartProduct.findOne({
      where: {
        id: id,
      },
      include: [Product, ProductColor, ProductSize, ProductMaterial],
    });
    if (!cartProductDetail) {
      return errorResponse("Product not found", {}, false, 400);
    }
    const cartDetail = await Cart.findOne({
      where: {
        id: cartProductDetail.cart_id,
      },
    });
    let variationsAmount = 0;
    if (cartProductDetail.ProductColor) {
      variationsAmount =
        variationsAmount +
        cartProductDetail.ProductColor.product_color_price *
          cartProductDetail.qty;
    }
    if (cartProductDetail.ProductSize) {
      variationsAmount =
        variationsAmount +
        cartProductDetail.ProductSize.product_size_price *
          cartProductDetail.qty;
    }
    if (cartProductDetail.ProductMaterial) {
      variationsAmount =
        variationsAmount +
        cartProductDetail.ProductMaterial.product_material_price *
          cartProductDetail.qty;
    }
    const amountToBeDecremented = cartProductDetail?.Product?.sale_price
      ? cartProductDetail?.Product?.sale_price * cartProductDetail.qty +
        variationsAmount
      : cartProductDetail?.Product?.price * cartProductDetail.qty +
        variationsAmount;
    await cartDetail.decrement("amount", { by: amountToBeDecremented });
    await cartProductDetail.destroy();
    return response("Item removed successfully");
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
module.exports = {
  addToCart,
  cartProductIncrement,
  getCartDetail,
  removeProductFromCart,
};
