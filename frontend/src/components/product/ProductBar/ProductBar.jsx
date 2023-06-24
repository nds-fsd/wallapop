import React, { useState, useContext } from "react";
import styles from "./productBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import ModalCompra from "../modalCompra/modalCompra";
import style from "../ProductPage/productPage.module.css";
import { getUserToken } from "../../../utils/localStorage.utils";

const ProductBar = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);

  const userToken = getUserToken();
  const navigate = useNavigate();

  // const openModal = () => {
  //   // console.log("Abriendo");
  //   setModalOpen(!modalOpen);
  // };

  const handleClick = () => {
    if (!userToken) {
      setSessionAlert(true);
      setShowAlert(false);
      return;
    } else {
      setModalOpen(!modalOpen);
    }
  };

  const handleSessionAlert = () => {
    setSessionAlert(false);
    const previousProductPage = window.location.pathname;
    localStorage.setItem("previousProductPage", previousProductPage);
    navigate("/user/login");
  };

  return (
    <>
      {data && !userToken && sessionAlert && (
        <div className={style.alert}>
          Debes iniciar sesión para ejecutar esta acción
          <div className={style.alertButtons}>
            <button onClick={handleSessionAlert} className={style.accept}>
              Aceptar
            </button>
            <button
              onClick={() => setSessionAlert(false)}
              className={style.accept}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className={styles.productBar}>
        <div className={styles.productDetails}>
          <div>
            <p>{data.title}</p>
            <h3>
              {data?.price?.toLocaleString("es-ES", { useGrouping: true })} €
            </h3>
          </div>
          {/* <NavLink to={`/category/products/comprar/${data._id}`}> */}
          <button onClick={handleClick} className={styles.comprar}>
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
