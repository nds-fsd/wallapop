import React, { useContext } from "react";
import ListCategory from "../category/listCategory/ListCategory";
import styles from "./index.module.css";
import stylesDark from "./indexDark.module.css";
import AllCategories from "../category/AllCategories/AllCategories";
import { ThemeContext } from "../../context/themeContext";

const Home = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? stylesDark.homeContainer : styles.homeContainer}>
      <h1> Compra y vende cosas de segunda mano </h1>
      <h2>Casi, casi, sin moverte del sofá</h2>
      <ListCategory />
      <AllCategories />
    </div>
  );
};

export default Home;
