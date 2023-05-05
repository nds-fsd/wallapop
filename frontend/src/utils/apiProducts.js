import axios from 'axios';
import { useQueryClient } from 'react-query';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {'Content-Type': 'application/json',}
});


export const getProductById = (queryKey) => {
    return api.get(`/products/${queryKey[1]}`)
    .then(res => res.data)
    .catch(error => {console.log(error)
    return[]})
};

// export const getProductByIdHarcoded = () => {
//     return api.get('/products/64478295b771f5dd3c5dab95')
//     .then(res => res.data)
//     .catch(error => {console.log(error)
//     return[]})
// }


export const getProductByIdHarcoded = () => {
    return api.get('/products/644eabfc231e21681d117b7b')
    .then(res => res.data)
    .catch(error => {console.log(error)
    return[]})
};

export const getProductByIdHarcodedHouse = () => {
    return api.get('/products/644ebe60f1b76b31b761b446')
    .then(res => res.data)
    .catch(error => {console.log(error)
    return[]})
};




export const postProduct = () => {
    const queryClient = useQueryClient()
    return api.post('/products/newProduct')
    .then(res => res.data)
    .catch(error => {console.log(error)
    .finally(() => {
        queryClient?.invalidateQueries('products')
    })
    return[]})
};

