import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const DEFAULT_VALUES = {
  /* ------------ GRAY ------------*/
  "--grey-to-yellow-light": "#eaeeee",
  "--gray-to-bg-dark": "#eaeeee",
  "--grey-to-bg-medium": "#eaeeee",
  "--grey-to-white": "#eaeeee",
  "--grey-to-black": "#eaeeee",

  /* ------------ BLACK ------------*/
  "--black-to-white": "black",
  "--black-to-yellow-dark": "black",
  "--black-to-yellow-main": "black",
  "--black-to-yellow-light": "black",

  /* ------------ WHITE ------------*/
  "--white-to-bg-medium": "white",
  "--white-to-bg-dark": "white",
  "--white-to-black": "white",

  /* ------------ TRANSPARENT ------------*/
  "--transparent-to-yellow-main": "transparent",

  /* ------------ BLUE DARK ------------*/
  "--blue-dark-to-white": "#0e165c",
  "--blue-dark-to-yellow-dark": "#0e165c",
  "--blue-dark-to-yellow-light": "#0e165c",
  "--blue-dark-to-yellow-main": "#0e165c",
  "--blue-dark-to-blue-light": "#0e165c",
  "--blue-dark-to-bd-medium": "#0e165c",
  "--blue-dark-to-white": "#0e165c",
  "--blue-dark-to-grey": "#0e165c",
  "--blue-dark-to-none": "solid 0.15rem #0e165c",

  /* ------------ BLUE MEDIUM ------------*/
  "--blue-medium-to-blue-light": "#39428d",
  "--blue-medium-to-bg-dark": "#39428d",

  /* ------------ BLUE LIGHT ------------*/
  "--blue-light-to-yellow-main": "#6ae3eb",
  "--blue-light-to-yellow-light": "#6ae3eb",

  /* ------------ YELLOW LIGHT ------------*/
  "--yellow-light-to-blue-light": "#fcf7e3",
  "--yellow-light-to-bg-dark": "#fcf7e3",
  "--yellow-light-to-black": "#fcf7e3",
  /* ------------ YELLOW DARK ------------*/
  "--yellow-dark-to-bg-dark": "#706a53c0",

  /* ------------ YELLOW MAIN ------------*/
  "--yellow-main-to-blue-light": "#eba905",
  "--yellow-main-to-blue-dark": "#eba905",
  "--yellow-main-to-bg-dark": "#eba905",
  "--yellow-main-to-red": "#eba905",
  "--yellow-main-to-blue-medium": "#eba905",

  /* ------------ NONE ------------*/
  "--none-to-blue-dark:": "solid 0.15rem none",
  "--none-to-blue-light": "solid 0.15rem none",
  "--none-to-blue-dark": "solid 0.15rem none",
};

const DEFAULT_DARK_VALUES = {
  /* ------------ GREY ------------*/
  "--grey-to-yellow-light": "#fcf7e3",
  "--gray-to-bg-dark": " #202123",
  "--grey-to-bg-medium": " #303031",
  "--grey-to-white": "white",
  "--grey-to-black": "black",

  /* ------------ BLACK ------------*/
  "--black-to-white:": "#fff",
  "--black-to-yellow-dark": "#706a53c0",
  "--black-to-yellow-main": "#eba905",
  "--black-to-yellow-light": "#fcf7e3",

  /* ------------ WHITE ------------*/
  "--white-to-bg-medium": "#303031",
  "--white-to-bg-dark": "#202123",
  "--white-to-black": "black",

  /* ------------ TRANSPARENT ------------*/
  "--transparent-to-yellow-main": "#eba905",

  /* ------------ BLUE DARK ------------*/
  "--blue-dark-to-yellow-dark": "#0e165c",
  "--blue-dark-to-yellow-light": "#fcf7e3",
  "--blue-dark-to-yellow-main": "#eba905",
  "--blue-dark-to-blue-light": "#6ae3ebc",
  "--blue-dark-to-bd-medium": "#303031",
  "--blue-dark-to-white": "white",
  "--blue-dark-to-grey": "#eaeeee",
  "--blue-dark-to-none": "solid 0.15rem none",

  /* ------------ BLUE MEDIUM ------------*/
  "--blue-medium-to-blue-light": "#6ae3eb",
  "--blue-medium-to-bg-dark": "#202123",
  "--blue-light-to-yellow-main": "#eba905",
  "--blue-light-to-yellow-light": "#fcf7e3",

  /* ------------ YELLOW LIGHT ------------*/
  "--yellow-light-to-blue-light": "#6ae3eb",
  "--yellow-light-to-bg-dark": "#202123",
  "--yellow-light-to-black": "black",

  /* ------------ YELLOW DARK ------------*/
  "--yellow-dark-to-bg-dark": "#202123",

  /* ------------ YELLOW MAIN ------------*/
  "--yellow-main-to-blue-light": "#6ae3eb",
  "--yellow-main-to-blue-dark": "#0e165c",
  "--yellow-main-to-bg-dark": "#202123",
  "--yellow-main-to-blue-medium": "#39428d",
  "--yellow-main-to-red": "rgba(226, 34, 34, 0.692)",

  /* ------------ NONE ------------*/
  "--none-to-blue-dark:": "solid 0.15rem #0e165c",
  "--none-to-blue-light": "solid 0.15rem #6ae3eb",
  "--none-to-blue-dark": "solid 0.15rem #0e165c",
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    const r = document.querySelector(":root");

    // Coge las clases dependiendo si dark es true o false
    if (darkMode) {
      Object.entries(DEFAULT_DARK_VALUES).forEach(([key, value]) => {
        r.style.setProperty(key, value);
      });
    } else {
      //* valores por defecto (los mismos de index css) */
      Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
        r.style.setProperty(key, value);
      });
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
