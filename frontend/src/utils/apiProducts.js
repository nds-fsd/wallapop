import axios from "axios";
import { useQueryClient } from "react-query";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

export const getProductById = ({ queryKey }) => {
  return api
    .get(`/products/${queryKey[1]}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const getProductByCategory = ({ queryKey }) => {
  return (
    api
      //si no le pongo {queryKey} hay que acceder a la propiedad queryKey
      .get(`/products/category/${queryKey[1]}`)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        return [];
      })
  );
};

export const getProductByIdHarcoded = () => {
  return api.get("/products/644eabfc231e21681d117b7b")
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const getProductByIdHarcodedHouse = () => {
  return api.get('/products/64567f375b58e334d1dd118d')
  .then(res => res.data)
  .catch(error => 
    {console.log(error)
    return[]})
};

export const getProductByIdHarcodedVehicle = () => {
  return api.get('/products/644ebe96f1b76b31b761b454')
  .then(res => res.data)
  .catch(error => 
    {console.log(error)
    return[]})
};


export const postProduct = (data) => {
  return api.post('/products/newProduct', data)
};
