import React, { useState } from "react";
import LatestProducts from "./LatestProducts";
import ProductList from "./ProductList";
import medalla from "../../../assets/images/medalla.png";
import google from "../../../assets/images/google-store.png";
import apple from "../../../assets/images/app-store.png";
import movil from "../../../assets/images/movil.png";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <>
      <LatestProducts />
      <ProductList />
      <div className={styles.container}>
        <div className={styles.columnLeft}>
          <div className={styles.icons}>
            <span className="icon-moda"></span>
            <img src={medalla} />
            <span className="icon-servicios"></span>
          </div>
          <div className={styles.pro}>
            <h2>ReTrend PRO</h2>

            <h3>¿Tienes un negocio y necesita un impulso?</h3>
            <h4>
              Retrend te acompaña durante todo el proceso para que te conviertas
              en un experto de la venta online.
            </h4>
            <button>Quiero saber más</button>
          </div>
        </div>
        <div className={styles.columnRight}>
          <div className={styles.app}>
            <h2>¿Cansado del PC?</h2>
            <h3>
              Descarga ya la app de ReTrend y empieza a comprar y vender
              cómodamente desde donde quieras.
            </h3>
          </div>
          <div className={styles.storeButtons}>
            <div className={styles.puntuation}>
              <h3>4.8</h3>
              <div className={styles.stars}>
                <span className="icon-star-full" />
                <span className="icon-star-full" />
                <span className="icon-star-full" />
                <span className="icon-star-full" />
                <span className="icon-star-half" />
              </div>
              <button className="store-button">
                <img src={google} />
                <div className={styles.store}>
                  <span>DISPONIBLE EN</span>
                  <span className="store-name">Google Play</span>
                </div>
              </button>
            </div>

            <div className={styles.puntuation}>
              <h3>4.9</h3>
              <div className={styles.stars}>
                <span className="icon-star-full" />
                <span className="icon-star-full" />
                <span className="icon-star-full" />
                <span className="icon-star-full" />
                <span className="icon-star-half" />
              </div>
              <button className="store-button">
              <img src={apple} />
              <div className={styles.store}>
                <span>DISPONIBLE EN</span>
                <span>App Store</span>
              </div>
            </button>
            </div>
            
          </div>
          <img src={movil} className={styles.movil} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
