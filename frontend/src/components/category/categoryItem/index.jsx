import React from "react";
import styles from "./styles.module.css";

const CategoryItem = ({ category }) => {
  console.log("CATEGORY");

  return (
    <div className={styles.container}>
      <img src={category.logo}></img>
      <p type="text" className={"text"}>
        {category.name}
      </p>
    </div>
  );
};

export default CategoryItem;
