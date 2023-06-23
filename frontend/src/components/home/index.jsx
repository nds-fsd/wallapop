import React, { useContext } from "react";
import ListCategory from "../category/listCategory/ListCategory";
import styles from "./index.module.css";
import HomePage from "./HomePage/HomePage";
import banner from "../../assets/images/banner2.png"
import bannerDark from "../../assets/images/bannerDark.png"
import { ThemeContext } from "../../context/themeContext";


const Home = () => {
    const { darkMode } = useContext(ThemeContext);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.banner}>
        <img src={ darkMode ? bannerDark : banner} alt="banner" />
      </div>
      {/* <h1> Dale una segunda vida a lo que ya no usas </h1>
      <h2>Reuse, Recycle, ReTrend</h2> */}
      {/* <h2>Casi, casi, sin moverte del sofá</h2> */}
      <ListCategory />
      <HomePage />
    </div>
  );
};

export default Home;
