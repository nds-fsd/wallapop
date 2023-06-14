const express = require("express");
const {
  getAllProducts,
  getProductById,
  getProductByCategory,
  postProduct,
  updateProductById,
  deleteProductById,
  getProductByUser,
  getProductByUserFavs,
  getProductByName,
  getProductByUserSold,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/getbyuser/:user", getProductByUser);
productRouter.get("/getbyuser/:user", getProductByUserFavs);
productRouter.get("/sold/:user", getProductByUserSold);
productRouter.get("/category/:category", getProductByCategory);
productRouter.get("/category/product/:name", getProductByName);
productRouter.post("/newproduct/:user", postProduct);
productRouter.patch("/:id", updateProductById);
productRouter.delete("/:id", deleteProductById);

module.exports = productRouter;

// manera común de hacer el routing
// const {products} = require('../data/index');
// const Product = require('../mongo/schemas/productSchema')

// const productRouter = express.Router();

// productRouter.get('/products', async (req, res) => {
//   const allProducts = await Product.find().exec();
//   res.status(200).json(allProducts);
// });

// productRouter.get('/products/:id', async (req, res) => {
//   const ProductById = await Product.findById(req.params.id);
//   if (ProductById) {
//     res.status(200).json(ProductById);
//   } else {
//     res.status(404).send("Sorry, this product doesn't exist")
//   }
// });

// productRouter.post('/products', async(req, res) => {
//   const postProduct = new Product (req.body);
//   await postProduct.save();
//   res.status(201).json(postProduct);
// });

// productRouter.patch('/products/:id', async (req, res) => {
//   const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body);

//   if (updateProduct) {
//     res.status(204).json(updateProduct);
//   } else {
//     res.status(404).send("Sorry, the product you are looking for doesn't match with existing ones")
//   }
// });

// productRouter.patch('/products/query/:title', async (req, res) => {
//   const filter = {
//     title: req.params.title
//   };
//   const updateProduct = await Product.findOneAndUpdate(filter, req.body);

//   if (filter) {
//     res.status(204).json(updateProduct);
//   } else {
//     res.status(404).send("Sorry, the product you are looking for doesn't match with existing ones")
//   }
// });

// productRouter.delete('/products/:id', async (req, res) => {
//   const deleteProduct = await Product.findByIdAndDelete(req.params.id);

//   if(deleteProduct) {
//     res.status(200).send("Your product has been successfully deleted");
//   } else {
//     res.status(404).send("Sorry, this product doesn't exist");
//   }
// });

// module.exports = productRouter;
