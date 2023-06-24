import React from "react";
import styles from "../../category/AllCategories/allCategories.module.css";
import FeaturedProducts from "./FeaturedProducts";

const ProductList = () => {
  const categoriesToRenderA = [
    "Deporte y Ocio",
    "Consolas y Videojuegos",
    "TV, Audio y Foto",
    "Cine, Libros y Música",
  ];

  const categoriesToRenderB = [
    "Hogar y Jardín",
    "Electrodomésticos",
    "Construcción y Reformas",
    "Informática y Electrónica"
  ];

  return (
    <>
      <h1 className={styles.genTitle}>Tiempo de ocio</h1>
      <FeaturedProducts categoriesToRender={categoriesToRenderA} />
      <h1 className={styles.genTitle}>Todo para tu hogar</h1>
      <FeaturedProducts categoriesToRender={categoriesToRenderB} />
    </>
  );
};

export default ProductList;
