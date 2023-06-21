import { useNavigate } from "react-router-dom";
import { api } from "./api";
import { getUserData, getUserToken } from "./localStorage.utils";

export const getAllProducts = () => {

  return api
    .get("/products/")
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getProductById = ({ queryKey }) => {
  return api
    .get(`/products/${queryKey[1]}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const getProductByUser = () => {
  const { id } = getUserData();
  const { token } = getUserToken();
  return api
    .get(`/products/getbyuser/${id}`, {
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

export const getFavsByUser = () => {
  const { id } = getUserData();
  const { token } = getUserToken();  
  return api
    .get(`/products/getbyuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        favorite: true,
      }
    })
    .then((res) => {
      const filteredProducts = res.data.filter((product) => product.favorite === true)
      return filteredProducts;
    })
    .catch((error) => {
      console.log(error);
      return {
        error:
          "Sorry, we couldn't retrieve your products. Please try again later.",
      };
    });
};

export const getSoldByUser = () => {
  const { id } = getUserData();
  const { token } = getUserToken();
  return api
    .get(`/products/sold/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        favorite: true,
      },
    })
    .then((res) => {
      const filteredProducts = res.data.filter(
        (product) => product.sold === true
      );
      return filteredProducts;
    })
    .catch((error) => {
      console.log(error);
      return {
        error:
          "Sorry, we couldn't retrieve your products. Please try again later.",
      };
    });
};

export const getProductByCategory = ({ queryKey }) => {
  return (
    api
      //si no le pongo {queryKey} hay que acceder a la propiedad queryKey (queryKey.queryKey)
      .get(`/products/category/${queryKey[1]}`)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        return [];
      })
  );
};
export const getProductByName = ({ queryKey }) => {
  return (
    api
      //si no le pongo {queryKey} hay que acceder a la propiedad queryKey (queryKey.queryKey)
      .get(`/products/category/product/${queryKey[1]}`)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        return [];
      })
  );
};

// export const postProduct = (data) => {

//   // const { id } = JSON.parse(localStorage.getItem("user"));
//   const { id } = getUserData();

//   const favoriteData = {
//     user: null,
//     fav: null,
//   };

//   const productData = { ...data, favorite: favoriteData };

//   return api
//     .post(`/products/newProduct/${id}`, productData)
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//       return {
//         error: "Sorry, we couldn't post your product.",
//       };
//     });
// };

export const postProduct = (data) => {
  const { id } = getUserData();

  return api
    .post(`/products/newProduct/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        error: "Sorry, we couldn't post your product.",
      };
    });
};

export const updateProduct = (product) => {

  const id = product._id;

  const { token } = getUserToken();

  return api
    .patch(`/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const changeFavorite = (product) => {
  // console.log("paso por la api de update", product)
  const id = product._id
  const { token } = getUserToken();
  const isLoggedIn = token ? true : false
  if (!isLoggedIn) {
    return Promise.resolve("/user/login")
  }
  return api
  .patch(`/products/${id}`, product , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => res.data )
  .catch((error) => {
    console.log(error)
  });
};

export const deleteProduct = (id) => {
  const { token } = getUserToken();
  return api
    .delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
