import { api } from "./api";

export const getProductById = ({ queryKey }) => {
  console.log(queryKey)
  return api
    .get(`/products/${queryKey[1]}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const getProductByUser = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user.id
  console.log("el user", userId)
  return api
  .get(`/user/products/published?userId=${userId}`)
  .then((res) => res.data)
  .catch((error) => {
    console.log(error);
    return [];
  })
}

// export const getProductByUser = ({ queryKey }) => {
//   const user = localStorage.getItem("user")
//   console.log(user)
//   return api
//   .get(`/products/userId/${queryKey[1]}`)
//   .then((res) => res.data)
//   .catch((error) => {
//     console.log(error);
//     return [];
//   })
// }

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
  const userId = localStorage.getItem("user");
  // console.log(userId);

  return api.post(`/products/newProduct/${userId}`, data);
};

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
