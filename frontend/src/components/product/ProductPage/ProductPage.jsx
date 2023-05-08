import React, { useEffect, useState } from "react";
import {
  getProductByIdHarcoded,
  getProductById,
} from "../../../utils/apiProducts";
import { useQuery, useMutation } from "react-query";
import styles from "./productPage.module.css";
import Slider from "../Slider/Slider";
import ProductBar from "../ProductBar/ProductBar";
import BeatLoader from "react-spinners/BeatLoader";
import GridLoader from "react-spinners/GridLoader";
import RiseLoader from "react-spinners/RiseLoader";
import Spinner from "../../Spinner/Spinner";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  const mockImages = [
    "https://picsum.photos/id/1/700/500",
    "https://picsum.photos/id/2/700/500",
    "https://picsum.photos/id/3/700/500",
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  //para coger el id de la url
  const params = useParams();
  const { data: product, isLoading } = useQuery(
    ["product", params.productid],
    getProductById
  );

  return (
    <>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <div className={styles.container}>
          <div className={styles.upperBar}>
            <button className={styles.like}>
              <span className="icon-heart1"></span>
            </button>
            <button className={styles.chat}>CHAT</button>
          </div>
          <Slider images={mockImages} />
          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <h1 className={styles.price}>{product && product.price}</h1>
              <h2>EUR</h2>
            </div>
            <h2>{product && product.title}</h2>
            <p>{product && product.status}</p>
          </div>
          <div className={styles.category}>
            <span className="icon-display"></span>
            <h3>{product && product.category}</h3>
          </div>
          <div className={styles.line}></div>
          <div>
            <div className={styles.expandable}>
              <h3>DESCRIPCIÓN DEL PRODUCTO</h3>
              <button
                onClick={handleExpandClick}
                className={!isExpanded ? styles.arrow : styles.active}
              >
                <span className="icon-circle-down"></span>
              </button>
            </div>
            {isExpanded ? "" : ""}
            {isExpanded && <p>{product && product.description}</p>}
          </div>
          <div className={styles.media}>
            <p>Comparte este producto con tus amigos</p>
            <div className={styles.mediaIcons}>
              <span className="icon-facebook2"></span>
              <span className="icon-twitter"></span>
              <span className="icon-whatsapp"></span>
              <span className="icon-mail2"></span>
            </div>
          </div>
          <ProductBar product={product} />
        </div>
      )}
    </>
  );
};

export default ProductPage;

// <div className={styles.details}>
//             <h1>890 €</h1>
//             <h2>Ordenador portátil</h2>
//             <p>Como nuevo </p>
//         </div>
//         <div className={styles.category}>
//             <span className='icon-display'></span>
//             <h3>Informática y Electrónica</h3>
//         </div>
//         <div className={styles.line}></div>
//         <p>Procesador Intel Core i9-11900H. Tarjeta gráfica NVIDIA GeForce RTX 3050 (Laptop, 65W). Pantalla de 15.6″, 2.8K (2880 x 1620), 120 Hz, OLED. Memoria de 1000GB SSD. Memoria RAM de 16GB DDR4. Peso de 1.75 kg (3.9 lbs)</p>
//         <div className={styles.media}></div>
