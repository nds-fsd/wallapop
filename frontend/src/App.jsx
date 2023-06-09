import React, { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CreateUserPage from "./components/createUser";
import LoginPage from "./components/loginUser";
import UserPage from "./components/user";
import Navbar from "./components/home/navbar";
import ListCategory from "./components/category/listCategory/ListCategory";
import ListProducts from "./components/product/listProduct/ListProducts";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/home";
import CreateProductPage from "./components/createProduct/CreateProductPage/CreateProductPage";
import PrivateRoutes from "./components/private-routes";
import { AuthProvider } from "./context/authContext";
import ProdPage from "./components/product/ProductPage/ProdPage";
import ListBuscador from "./components/home/ListBuscador/ListBuscador";
import Footer from "./components/home/Footer/Footer";
import SecondFooter from "./components/home/Footer/SecondFooter";
import ModalCompra from "./components/product/modalCompra/modalCompra";
import "./index.css";
import ChatRoom from "./components/chat/chat-room";

function App() {
  const queryClient = new QueryClient();
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div>
            <Navbar />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<CreateUserPage />} />
                <Route
                  path="/products/newproduct/*"
                  element={<CreateProductPage />}
                />

                {/* creo la ruta para poder acceder a las categorias desde otro sitio y la lista de productos 
              Lo creo dentro del routs sin mostrarlo porque asi por mucho que cambie de categoria sigue mostrandose la navBar arriba
              en caso que no fuera asi no se mostraria
              Aqui solo la declaro la ruta para que exista y poder acceder desde otro lado */}
                <Route path="/category" element={<ListCategory />}>
                  <Route path=":category" element={<ListProducts />} />
                  <Route path="product/:productid" element={<ProdPage />} />
                  <Route
                    path="product/search/:name"
                    element={<ListBuscador />}
                  />
                  <Route
                    path="products/comprar/:id"
                    element={<ModalCompra />}
                  />
                </Route>
                <Route path="/user" element={<PrivateRoutes />}>
                  <Route path="" element={<UserPage />} />
                  <Route path="*" element={<UserPage />} />
                </Route>
              </Routes>
            </div>
            {isHomePage ? <Footer /> : <SecondFooter />}

          </div>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
