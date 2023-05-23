import { api } from "./api";
import { getUserData, getUserToken } from "./localStorage.utils";

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

export const postProduct = (data) => {
  // const { id } = JSON.parse(localStorage.getItem("user"));
  const { id } = getUserData();
  return api
    .post(`/products/newProduct/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};


export const updateProduct = (product) => {
  const id = product._id
  const { token } = getUserToken()
  // console.log("paso por la api de update", product)
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
  const token = JSON.parse(localStorage.getItem("user-session"));
  return api
  .delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.data)
  .catch((error) => {
    console.log(error)
  })
}



// export const getProductByIdHarcoded = () => {
//   return api
//     .get("/products/644eabfc231e21681d117b7b")
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//       return [];
//     });
// };

// export const getProductByIdHarcodedHouse = () => {
//   return api
//     .get("/products/64567f375b58e334d1dd118d")
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//       return [];
//     });
// };

// export const getProductByIdHarcodedVehicle = () => {
//   return api
//     .get("/products/644ebe96f1b76b31b761b454")
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//       return [];
//     });
// };
