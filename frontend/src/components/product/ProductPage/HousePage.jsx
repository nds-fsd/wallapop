import React, { useState } from "react";
import styles from "./productPage.module.css";
import { getProductByIdHarcodedHouse } from "../../../utils/apiProducts";
import { useQuery } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";

const HousePage = () => {
  const mockImages = [
    "https://picsum.photos/id/1/700/500",
    "https://picsum.photos/id/2/700/500",
    "https://picsum.photos/id/3/700/500",
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const id = "64567f375b58e334d1dd118d";
  // const id = "644796a9d7f98ce14c6ec067"

  // const {data, isLoading} = useQuery(['product', id], getProductById)
  const { data } = useQuery(["product", id], getProductByIdHarcodedHouse);

  return (
    <>
      <div className={styles.productPage}>
        <div className={styles.container}>
          <div className={styles.upperBar}>
            <button className={styles.like}>
              <span className="icon-heart1"></span>
            </button>
            <button className={styles.chat}>CHAT</button>
          </div>
          {data && <Slider images={mockImages} data={data} />}
          <div className={styles.houseType}>
            <p className={styles.houseDetail}>{data && data.type}</p>
            <p className={styles.houseDetail}>{data && data.rent}</p>
            <p className={styles.houseDetail}>{data && data.land} m2</p>
          </div>
          <div className={styles.priceContainer}>
            <h1 className={styles.price}>
              {data && data.price.toLocaleString('es-ES', {useGrouping: true})}
            </h1>
            <h2>EUR</h2>
          </div>
          <h2 className={styles.detailsHouse}>{data && data.title}</h2>
          {data && <Keywords data={data} />}
          <div className={styles.line}></div>
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
          {isExpanded && (
            <p className={styles.textExpanded}>{data && data.description}</p>
          )}

          <div className={styles.media}>
            <p>Comparte este producto con tus amigos</p>
            <div className={styles.mediaIcons}>
              <span className="icon-facebook2"></span>
              <span className="icon-twitter"></span>
              <span className="icon-whatsapp"></span>
              <span className="icon-mail2"></span>
            </div>
          </div>
          {data && <ProductBar data={data} />}
        </div>
      </div>
    </>
  );
};

export default HousePage;
