import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import CreateUserPage from "./components/createUser"
import LoginPage from "./components/loginUser"
import UserPage from "./components/user"
import ProductPage from './components/product/ProductPage/ProductPage';
import Navbar from './components/home/navbar'
import ListProducts from "./components/product/listProduct/ListProducts";
import Postproform from './components/createProduct/form/Form';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import PrivateRoutes from './components/privateRoutes';

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
                <Route path="/user" element={<PrivateRoutes />}>
                  <Route path="" element= {<UserPage />} />
                  <Route path="*" element= {<UserPage />} />
                </Route>
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


