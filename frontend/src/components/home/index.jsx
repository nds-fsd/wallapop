import React, { useContext } from "react";
import ListCategory from "../category/listCategory/ListCategory";
import styles from "./index.module.css";
import AllCategories from "../category/AllCategories/AllCategories";
import HomePage from "./HomePage/HomePage";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1> Compra y vende cosas de segunda mano </h1>
      <h2>Casi, casi, sin moverte del sofá</h2>
      <ListCategory />
      <HomePage />
    </div>
  );
};

export default Home;
