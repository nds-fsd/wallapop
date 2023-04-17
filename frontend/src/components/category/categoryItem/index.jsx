import React from "react";
import styles from "./styles.module.css";

const CategoryItem = ({ category }) => {
  console.log("CATEGORY");

  return (
    <div className={styles.container}>
      <p type="text" className={"text"}>
        {category.name}
      </p>
      <img src={category.logo}></img>
      <img src={window.location.origin + category.logo}></img>
    </div>
  );
};

export default CategoryItem;
