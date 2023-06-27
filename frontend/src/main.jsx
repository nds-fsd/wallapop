import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ThemeProvider from "./context/themeContext";
import LangContext from "./context/idiomaContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LangContext>
          <App />
        </LangContext>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
