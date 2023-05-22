import React, { useState } from "react";
import styles from "./productPage.module.css";
import { useQuery } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import { getProductById } from "../../../utils/apiProducts";

const VehiclePage = ({ id }) => {
  const mockImages = [
    "https://picsum.photos/id/1/700/500",
    "https://picsum.photos/id/2/700/500",
    "https://picsum.photos/id/3/700/500",
  ];

  // console.log("el id del vehiculo", id)

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const { data, isLoading } = useQuery(["product", id], getProductById);
  // const { data: user } = useQuery(["user", id], findUserByID);
  // console.log(user)

  console.log("el user", data.user)


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
          
          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <h1 className={styles.price}>
                {data &&
                  data.price.toLocaleString("es-ES", { useGrouping: true })}
              </h1>
              <h2>EUR</h2>
            </div>
            <div className={styles.category}>
              <span className="icon-display"></span>
              <h3>{data && data.category}</h3>
            </div>
          </div>

          <h2>{data && data.title}</h2>
          {data && <Keywords data={data} />}
          
          <div className={styles.detailType}>
            <h5 className={styles.detail}>{data && data.brand}</h5>
            <h5 className={styles.detail}>{data && data.model}</h5>
            <h5 className={styles.detail}>{data && data.year}</h5>
            <h5 className={styles.detail}>{data && data.doors} puertas</h5>
            <h5 className={styles.detail}>{data && data.seats} asientos</h5>
          </div>
          <div className={styles.detailType2}>
            <h5 className={styles.detail}>
              {data.km.toLocaleString("es-ES", { useGrouping: true })} Km
            </h5>
            <h5 className={styles.detail}>{data && data.engine}</h5>
            <h5 className={styles.detail}>{data && data.shift}</h5>
          </div>

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

export default VehiclePage;
