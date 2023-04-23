import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query'
import ProductPage from './components/product/ProductPage/ProductPage';
import { ReactQueryDevtools } from 'react-query/devtools'
// import Slider from './components/product/Slider/Slider';
// import ProductImages from './components/product/Product/ProductImages';




function App() {

  const queryClient = new QueryClient();
  

    return (
    <>
    
      <QueryClientProvider client={queryClient}>
        <div>
          <ProductPage />
        </div>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>

  )
}

export default App;

// // Posible enroutado para la página de producto:
// // Dentro de cada página de producto, que haya un outlet para renderizar las imágenes dentro del slider
// // Al clickar sobre una imagen que se abra otra página para ver las imágenes más grandes
// // Barra estática como footer que muestre el title, precio y botón de comprar - DONE
// // Menú desplegable para la descripción del producto


// <div className='main-router'>
//   <Routes>
//     <Route path={PRODUCT_ID} element={<ProductPage />}/>
//       <Route path={PRODUCT_ID} element={<Slider />} />
//       <Route path="" element={<ProductImages />}  />
//   </Routes>
// </div>


