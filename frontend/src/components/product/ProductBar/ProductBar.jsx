import React, { useState, useContext } from "react";
import styles from "./productBar.module.css";
import { NavLink } from "react-router-dom";
import ModalCompra from "../modalCompra/modalCompra";

const ProductBar = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    // console.log("Abriendo");
    setModalOpen(!modalOpen);
  };

  const handleClick = (data) => {
    // console.log("el id del producto", data);
    openModal();
  };

  return (
    <>
      <div className={styles.productBar}>
        <div className={styles.productDetails}>
          <div>
            <p>{data.title}</p>
            <h3>
              {data?.price?.toLocaleString("es-ES", { useGrouping: true })} €
            </h3>
          </div>
          {/* <NavLink to={`/category/products/comprar/${data._id}`}> */}
          <button onClick={() => handleClick(data)} className={styles.comprar}>
            COMPRAR
          </button>
          {/* </NavLink> */}
          <ModalCompra
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default ProductBar;
