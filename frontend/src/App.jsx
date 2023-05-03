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
import ListCategory from "./components/category/listCategory/ListCategory";
import ListProducts from "./components/product/listProduct/ListProducts";
import Map from "./components/createProduct/map/Map.jsx";
import Postproform from './components/createProduct/form/Form';
import { Outlet, Route, Routes } from 'react-router-dom';
import Buscador from './components/home/Buscador';
import Home from './components/home';
import { USER } from './components/user/route-paths';

function App() {

  const queryClient = new QueryClient();
  

    return (
    <>
    
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar/>
         
          <div>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/login" element= {<LoginPage/>} />
                <Route path="/register" element= {<CreateUserPage />} />
                <Route path="/createproduct" element= {<Postproform />} />
                <Route path="/:pathcategory" element= {<ListProducts />} />
                <Route path="/:productid" element= {<ProductPage />} />
                <Route path="/user/*" element= {<UserPage />} />
            </Routes>
          </div>
         
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


