import { api } from "./api";
import { getUserToken } from "./localStorage.utils";


export const getFavorites = () => {

  const { id } = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("user-session"));  
  return api
  .get(`/favorites/getbyuser/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      favorite: true
    }
  })
  .then((res) => {
    const filteredProducts = res.data.filter((product) => product.favorite === true)
    console.log("Filtered products:", filteredProducts); // Log the filtered products
    return filteredProducts;
  })
  // .then((res) => res.data)
  .catch((error) => {
    console.log(error)
    return {
      error:
        "Sorry, we couldn't retrieve your products. Please try again later.",
    };
  })
}


export const changeFavorite = (product, isFavorite) => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const { token } = getUserToken();

  console.log("paso por la api de update", product);
  const favoriteData = {
    user: id,
    favorite: isFavorite,
    product: product._id
    // product: product.id
  };

  return api
    .post(`/favorites/${id}`, favoriteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

// export const changeFavorite = (product) => {
//   const { token } = getUserToken();
//   const { _id, favorite } = product;
//   console.log("el favorito", favorite);
//   console.log("paso por la api de update", product);
//   const updatedProduct = {
//     favorite: {
//       fav: favorite.fav,
//       user: favorite.user,
//     },
//   };
//   return api
//     .patch(`/products/${_id}/favorite`, updatedProduct, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//     });
// };