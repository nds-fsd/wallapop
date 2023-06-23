import React, { useContext } from "react";
import ListCategory from "../category/listCategory/ListCategory";
import styles from "./index.module.css";
import HomePage from "./HomePage/HomePage";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1> Dale una segunda vida a lo que ya no usas </h1>
      <h2>Reuse, Recycle, ReTrend</h2>
      {/* <h2>Casi, casi, sin moverte del sofá</h2> */}
      <ListCategory />
      <HomePage />
    </div>
  );
};

export default Home;
