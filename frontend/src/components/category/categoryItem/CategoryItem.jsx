import React from "react";
import styles from "./categoryItem.module.css";

const CategoryItem = ({ category }) => {
  // console.log("CATEGORY" + category);
  return (
    <div className={styles.container}>
      <img src={category.logo}></img>
      <p type="text" className={"text"}>
        {category.title}
      </p>
    </div>
  );
};

export default CategoryItem;
