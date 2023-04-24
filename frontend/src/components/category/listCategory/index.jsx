import React from "react";
import CategoryItem from "../categoryItem/index";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:3005/category");
      let payload;
      console.log("payload" + payload);

      if (response.ok) {
        payload = await response.json();
      } else {
        throw new Error("Fallo el ok del response :(");
      }
      console.log("success" + payload);
      setCategories(payload);
    } catch (fetchError) {
      console.log("FAILED", fetchError);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  // console.log("LISTCATEGORIES:" + categories);

  return (
    <div className={styles.container}>
      <div className={styles.carusel}>
        {categories.map((category) => {
          return (
            <CategoryItem
              className={styles.menu}
              key={category.id}
              category={category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListCategory;
