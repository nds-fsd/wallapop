const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find().exec();
    res.status(201).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Can't find products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await productModel.findById(id).exec();
    res.status(200).json(productById);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

const getProductByUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    const productByUser = await productModel
    .find({ user: userId })
    .populate("user");
    res.status(200).json(productByUser);
    console.log(productByUser);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find products to display" });
    console.log(error);
  };
};

// Buscar productos por categorias
const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const productByCategory = await productModel
      //buscamos por el nombre de la categoria que la obtenemos de la url
      .find({ category })
      //y populamos con categorias para buscar los productos que tiene esa categoria
      .populate("categories");
    res.status(200).json(productByCategory);
    console.log(productByCategory);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this category" });
    console.log(error);
  }
};

// Crear producto
const postProduct = async (req, res) => {
  const newProduct = new productModel(req.body);

  //cogemos el los datos del ususario que hemos pasado por la url de la peticion
  const userId = req.params.userId;
  //parseamos los datos y cogemos el id del usuario y lo añadimos al newProduct
  newProduct.user.push(JSON.parse(userId).id);

  //hacemos una findOne con el nombre de la categoria para poder obtener toda su info y coger el id para ponerselo al producto
  // y asi relacionarlo con categoria
  const cat = await categoryModel.findOne({ title: req.body.category });
  // le añadimos el id de la categoria encontrado arriba al producto antes de crearlo
  newProduct.categories.push(cat._id);
  try {
    await newProduct.save();
    // console.log(newProduct);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Can't post this product" });
    console.log(error);
  }
};

const updateProductById = async (req, res) => {
  try {
    const updateProduct = await productModel
      .findByIdAndUpdate(req.params.id, req.body)
      .exec();
    res.status(204).json({
      updateProduct,
      message: "Your product has been successfully updated",
    });
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

const updateProductByTitle = async (req, res) => {
  const filter = { title: req.params.title };
  try {
    const updateProd = await productModel
      .findOneAndUpdate(filter, req.body)
      .exec();
    res.status(204).json({
      updateProd,
      message: "Your product has been successfully updated",
    });
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const delProduct = await productModel
      .findByIdAndDelete(req.params.id)
      .exec();
    res.status(204).json({
      delProduct,
      message: "Your product has been successfully deleted",
    });
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByUser,
  getProductByCategory,
  postProduct,
  updateProductById,
  updateProductByTitle,
  deleteProduct,
};
