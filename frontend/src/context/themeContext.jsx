import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const DEFAULT_VALUES = {
  "--gray-to-bg-dark": "#eaeeee",
  "--background-medium": "#303031",
  "--white-to-bg-medium": "white",
  "--white-to-black": "white",
  "--transparent-to-yellow-main": "transparent",
  "--blue-dark-to-yellow-dark": "#0e165c",
  "--blue-dark-to-yellow-light": "#0e165c",
  "--blue-dark-to-yellow-main": "#0e165c",
  "--blue-medium": "#39428d",
  "--blue-light-to-yellow-main": "#6ae3eb",
  "--blue-light-to-yellow-light": "#6ae3eb",
  "--yellow-main-to-blue-light": "#eba905",
  "--yellow-main-to-blue-dark": "#eba905",
  "--yellow-main-to-bg-dark": "#eba905",
};

const DEFAULT_DARK_VALUES = {
  "--gray-to-bg-dark": "#202123",
  "--background-medium": "#303031",
  "--white-to-bg-medium": "#303031",
  "--white-to-black": "black",
  "--transparent-to-yellow-main": "#eba905",
  "--blue-dark-to-yellow-dark": "#706a53c0",
  "--blue-dark-to-yellow-light": "#fcf7e3",
  "--blue-dark-to-yellow-main": "#eba905",
  "--blue-medium": "#39428d",
  "--blue-light-to-yellow-main": "#eba905",
  "--blue-light-to-yellow-light": "#fcf7e3",
  "--yellow-main-to-blue-light": "#eba905",
  "--yellow-main-to-blue-dark": "#eba905",
  "--yellow-main-to-bg-dark": "#202123",
};

const ThemeProvider = ({ children }) => {
  // const [darkMode, setDarkMode] = useState(
  //   localStorage.getItem("darkMode", darkMode) || false
  // );
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    const r = document.querySelector(":root");

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
