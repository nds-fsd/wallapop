import { api } from "./api";
import { getUserData, getUserToken } from "./localStorage.utils";

export const getFavs = () => {
  const { id } = getUserData();
  const token = getUserToken();

  return api
    .get(`/favorites/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        error:
          "Sorry, we couldn't retrieve your products. Please try again later.",
      };
    });
};

export const createFav = (data) => {
  const { id } = getUserData();
  return api
    .post(`/favorites/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        error: "Sorry, can't create your favorite",
      };
    });
};

export const deleteFav = (productId) => {
  const { id } = getUserData();
  const { token } = getUserToken();
  return api
    .delete(`/favorites/${id}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const changeFavorite = (product, isFavorite) => {
  const { id } = JSON.parse(localStorage.getItem("user"));

  const { token } = getUserToken();

  const favoriteData = {
    favorite: isFavorite,
    product: product.id,
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
