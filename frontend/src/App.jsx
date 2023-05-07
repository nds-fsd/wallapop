import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CreateUserPage from "./components/createUser";
import LoginPage from "./components/loginUser";
import UserPage from "./components/user";
import ModalContainer from "./components/product/ModalContainer/ModalContainer";
import ProductPage from "./components/product/ProductPage/ProductPage";
import Form2 from "./components/createProduct/Form2/Form2";
import Navbar from "./components/home/navbar";
import ListCategory from "./components/category/listCategory/ListCategory";
import ListProducts from "./components/product/listProduct/ListProducts";
import Map from "./components/createProduct/map/Map.jsx";
import Postproform from "./components/createProduct/form/Form";
import { Outlet, Route, Routes } from "react-router-dom";
import Buscador from "./components/home/Buscador";
import Home from "./components/home";
import { USER } from "./components/user/route-paths";
import CategoryItem from "./components/category/categoryItem/CategoryItem";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />

          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<CreateUserPage />} />
              <Route path="/createproduct" element={<Postproform />} />
              <Route path="/user/*" element={<UserPage />} />
              {/* creo la ruta para poder acceder a las categorias desde otro sitio y la lista de productos 
              Lo creo dentro del routs sin mostrarlo porque asi por mucho que cambie de categoria sigue mostrandose la navBar arriba
              en caso que no fuera asi no se mostraria
              Aqui solo la declaro la ruta para que exista y poder acceder desde otro lado */}
              <Route path="/category" element={<ListCategory />}>
                <Route path=":category" element={<ListProducts />} />
                <Route path="product/:productid" element={<ProductPage />} />
              </Route>
            </Routes>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
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
