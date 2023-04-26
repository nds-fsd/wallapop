import { useState, useEffect } from "react";
import ListCategory from "./components/category/listCategory";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools> */}
      <div className="App">
        <h1>LANDING PAGE</h1>
        <ListCategory />
      </div>
      {/* </ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default App;
