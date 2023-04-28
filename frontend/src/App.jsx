import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import CreateUserPage from "./components/createUser"
import LoginPage from "./components/loginUser"
import UserPage from "./components/user"
import ModalContainer from './components/product/ModalContainer/ModalContainer';
import ProductPage from './components/product/ProductPage/ProductPage';
import Form2 from './components/createProduct/Form2/Form2';
import Navbar from './components/home/navbar'
import ListCategory from "./components/category/listCategory";
import ListProducts from "./components/product/listProduct";


function App() {

  const queryClient = new QueryClient();
  

    return (
    <>
    
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar/>
          <CreateUserPage />
          <LoginPage />
          <UserPage />
          <Form2 />
          <ProductPage />
          {/* <ModalContainer /> */}
          <ListCategory />
          <ListProducts />
          
        </div>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>

  )

}

export default App;

// // Posible enroutado para la página de producto ?? :

// <div className='main-router'>
//   <Routes>
//     <Route path={PRODUCT_ID} element={<ProductPage />}/>
//       <Route path={PRODUCT_ID} element={<Slider />} />
//       <Route path="" element={<ProductImages />}  />
//   </Routes>
// </div>

