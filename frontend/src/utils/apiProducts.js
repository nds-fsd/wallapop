import { useNavigate } from "react-router-dom";
import { api } from "./api";
import { getUserData, getUserToken } from "./localStorage.utils";

export const getAllProducts = () => {
  // console.log("paso por el get all")
  return api
    .get("/products/")
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getProductsByCategory = (category) => {
  return api
    .get("/products/")
    .then((res) => {
      const allProducts = res.data;
      if (category) {
        return allProducts.filter((product) => product.category === category);
      }
      return allProducts;
    })
    .catch((error) => {
      console.log(error);
      throw error;
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
  const { id } = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("user-session"));
  // console.log("el id", id);
  // console.log("el token", token);
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
  const { id } = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("user-session"));

  return (
    api
      .get(`/products/getbyuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          "favorite.fav": true,
        },
      })
      .then((res) => {
        const filteredProducts = res.data.filter((product) => product.favorite && product.favorite.fav === true)
        console.log("Filtered products:", filteredProducts); // Log the filtered products
        return filteredProducts;
      })
      .catch((error) => {
        console.log(error);
        return {
          error:
            "Sorry, we couldn't retrieve your products. Please try again later.",
        };
      })
  );
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


export const postProduct = (data) => {
  // console.log("esta es la data en el post", data)
  // const { id } = JSON.parse(localStorage.getItem("user"));
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
  console.log("paso por el update product", product)
  const id = product._id;
  // console.log("el id del producto a update", id)
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

export const deleteProduct = (id) => {
  const token = JSON.parse(localStorage.getItem("user-session"));
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
