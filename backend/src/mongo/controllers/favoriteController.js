const favoriteModel = require("../models/favoriteModel");

// Definimos el CRUD todas las funciones para poder llamarlas en el Router

const getFavoritesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await favoriteModel
      .find({ user: userId })
      .populate("products")
      .exec();
    res.status(200).json(favorites);
  } catch (error) {
    res
      .status(404)
      .json({ error: "Sorry, there are no favorite products to display" });
  }
};

const postFavorite = async (req, res) => {
  const { favorite, product } = req.body;
  const { user } = req.params;
  try {
    let existingFavorites = await favoriteModel.findOne({ user });
    if (existingFavorites) {
      if (favorite) {
        if (!existingFavorites.products.includes(product)) {
          existingFavorites.products.push(product);
        }
      } else {
        existingFavorites.products = existingFavorites.products.filter(
          (p) => p !== product
        );
      }
      existingFavorites.favorite = favorite;
    } else {
      existingFavorites = new favoriteModel({
        user,
        favorite,
      });
    }
    await existingFavorites.save();
    res.status(200).json(existingFavorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to create favorite" });
  }
};

module.exports = {
  getFavoritesByUser,
  postFavorite,
};
