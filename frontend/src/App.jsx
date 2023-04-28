import { useState, useEffect } from "react";
import ListCategory from "./components/category/listCategory";
import ListProducts from "./components/product/listProduct";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools> */}
      <div className="App">
        <h1>LANDING PAGE</h1>
      </div>
      {/* </ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default App;
