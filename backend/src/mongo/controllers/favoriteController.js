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



const postFav = async (req, res) => {
  const { favorite, product } = req.body;
  const { user } = req.params;
  // console.log("el product en back", req.body.product)
  try {
    let fav = await favoriteModel.findOne({ user });

    if (fav) {
      fav.favorite = favorite;
      if (favorite && product) {
        fav.products.addToSet(product);
      } else {
        fav.products.pull(product);
      }
    } else {
      fav = new favoriteModel({
        user,
        favorite: favorite,
        products: [product],
      });
    }
    console.log("despues del cambio", fav);

    await fav.save();

    res.json(fav);
  } catch (error) {
    console.log("Error updating favorite status:", error);
    res.status(500).json({ error: "Failed to update favorite status" });
  }
};


// const postFavorite = async (req, res) => {
//   const { favorite, product } = req.body;
//   const { user } = req.params;

//   try {
//     let existingFavorites = await favoriteModel.findOne({ user });

//     if (existingFavorites) {
//       console.log(
//         "existing favorite before update",
//         existingFavorites.favorite
//       );

//       if (favorite !== undefined) {
//         existingFavorites.favorite = favorite;
//       }

//       if (
//         favorite === true &&
//         !existingFavorites.products.includes(product._id)
//       ) {
//         existingFavorites.products.push(product._id);
//       } else if (!favorite) {
//         existingFavorites.products = existingFavorites.products.filter(
//           (p) => p && !p.equals(product._id)
//         );
//       }
//     } else {
//       existingFavorites = new favoriteModel({
//         user,
//         favorite: favorite || false,
//         products: [product._id],
//       });
//     }

//     console.log("existing favorite after update", existingFavorites.favorite);

//     existingFavorites = await existingFavorites.save();

//     res.status(200).json(existingFavorites);
//     console.log("el favorito cambiado", existingFavorites);
//   } catch (error) {
//     console.log("el error", error);
//     res.status(500).json({ error: "Failed to create favorite" });
//   }
// };

module.exports = {
  getFavoritesByUser,
  postFav,
};
