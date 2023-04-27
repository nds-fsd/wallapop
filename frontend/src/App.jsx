//import Postproform from "./components/createProduct/components/form/Form.jsx";
import React, { useState } from "react";
import "./App.css";
import Map from "./components/createProduct/components/map/Map.jsx";
import Postproform from "./components/createProduct/components/Form/Form.jsx";

function App() {
  return (
    <div>
      <Postproform />
      <Map />
    </div>
  );
}

export default App;
