const favoriteModel = require("../models/favoriteModel");
const productModel = require("../models/productModel");

// Definimos el CRUD todas las funciones para poder llamarlas en el Router

const getFavoritesByUser = async (req, res) => {
  const { user } = req.params;
  try {
    const favorites = await favoriteModel
      .find({ user })
      .populate("products")
      .exec();
    if (favorites.length === 0) {
      res
        .status(404)
        .json({ message: "Sorry, there are no favorite products to display" });
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve favorite products" });
  }
};


const createFav = async (req, res) => {
  const { product } = req.body;
  const { user } = req.params;

  try {
    const newFav = new favoriteModel({
      user: user,
      products: [product],
    });
    await newFav.save();
    res.status(201).json(newFav);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Can't create favorite" });
  }
};

const deleteFav = async (req, res) => {
  const { product, user } = req.params;
  try {
    const favorite = await favoriteModel.findOne({ user });
    if (!favorite) {
      res.status(404).json({error: "User has no favorite products"})
    }
    favorite.products.pull(product);
    await favorite.save();

    res.status(200).json({ message: "Product removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from favorites" });
  }
};


module.exports = {
  getFavoritesByUser,
  createFav,
  deleteFav
};
