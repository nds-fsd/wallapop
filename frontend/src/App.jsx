import { useState, useEffect } from "react";
import ListCategory from "./components/category/listCategory";

function App() {
  return (
    <div className="App">
      <h1>LANDING PAGE</h1>
      <ListCategory />
      
      {/* ReactQueryDevTools sirve para ver el valor de las variables mientras ejecutamos el proyecto,
            Si no lo queremos se comenta*/}
      {/* <ReactQueryDevTools initialIsOpen={false}/> */}
   
    </div>
  );
}

export default App;
