import React from "react";
import ListCategory from "../category/listCategory/ListCategory";
import style from "./index.module.css";
import AllCategoriesHome from "../category/AllCategories/AllCategoriesHome";
import HomePage from "./HomePage/HomePage";

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <h1> Compra y vende cosas de segunda mano </h1>
      <h2>Casi, casi, sin moverte del sofá</h2>
      <ListCategory />
      <HomePage />
    </div>
  );
};

export default Home;
