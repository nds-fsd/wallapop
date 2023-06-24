import React from "react";
import styles from "./modalContainer.module.css";
import ModalCompra from "./modalCompra";

const ModalContainerCompra = ({ modalOpen, setModalOpen, prod }) => {
  console.log("Hola, has ido al modal container compra");
  // console.log("PROD", prod);
  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.title}>
              <h2>Modo COOMPRA</h2>
              <button
                className={styles.close}
                onClick={() => setModalOpen(false)}
              >
                <span className="icon-cross1"></span>
              </button>
            </div>
            {prod && <ModalCompra prod={prod} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalContainerCompra;
