import React from "react";
import { useQuery } from "react-query";
import { getProductByIdHarcoded } from "../../../utils/apiProducts";
import styles from "./modalContainer.module.css";
import ModalContent from "./Modal/ModalContent";

const ModalContainer = ({modalOpen, setModalOpen, images}) => {
  

  const id = "64478295b771f5dd3c5dab95";

  // const {data} = useQuery(['product', id], getProductById)

  const { data } = useQuery(["product", id], getProductByIdHarcoded);

  // const params = useParams();
  // const { data, isLoading } = useQuery(
  //   ["product", params.productid],
  //   getProductById
  // );

  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.title}>
              <h3 className={styles.name}>Imágenes de: {data && data.title}</h3>
              <button className={styles.close} onClick={()=> setModalOpen(false)}>
                <span className="icon-cross1"></span>
              </button>
              <div className={styles.line}></div>
            </div>
            <ModalContent images={images}/>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalContainer;
