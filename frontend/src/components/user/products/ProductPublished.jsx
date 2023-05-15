import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductByUser } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import styles from "./products.module.css";
import Images from "./Image/Images";
import ModalContainer from "../../product/ModalContainer/ModalContainer";
import Keywords from "../../product/Keywords/Keywords";
const ProductPublished = () => {
 

  const { data: prods, isLoading } = useQuery({
    queryKey: ["products_published"],
    queryFn: getProductByUser,
  });

  console.log(prods);
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <>
      {/* {isLoading && (
        <div>
          <Spinner />
        </div>
      )} */}
    <div className={styles.container}>
      {!isLoading && (
        prods.map((prod) => {
          return (
            // <div className={styles.container}>
              <div className={styles.card}>
                {prods && <Images images={prod.images} />}
                <div className={styles.titleContainer}>
                  <h3 className={styles.title}>{prods && prod.title}</h3>
                  <h3>{prods && prod.price.toLocaleString('es-ES', {useGrouping: true})} €</h3>
                </div>
                <div className={styles.details}>
                  <h5>Informática y Electrónica</h5>
                  <p>{prods && prod.status}</p>
                </div>
                <div className={styles.keywords}>{prods && prod.keywords}</div>
                <p className={styles.paragraph}>{prods && prod.description}</p>
                <div className={styles.icons}>
                  <button onClick={() => setModalOpen(!modalOpen)}><span className="icon-pen1"></span></button>
                  <button><span className="icon-bin"></span></button>
                </div>
                {prods && <ModalContainer modalOpen={modalOpen} setModalOpen={setModalOpen} prod={prod}/>}
              </div>
            // </div>
          )
        })
      )}
    </div>
    </>
  );
};

export default ProductPublished;


// <div className={styles.container}>
//         <div className={styles.card}>
//           <img src={mockImages[0]}></img>
//           <div className={styles.titleContainer}>
//             <h3 className={styles.title}>Ordenador portátil</h3>
//             <h3>890 €</h3>
//           </div>
//           <div className={styles.details}>
//             <h5>Informática y Electrónica</h5>
//             <p>Como nuevo</p>
//           </div>
//           <div className={styles.keywords}>
//             #PC #Samsung #portátil #pepinazo
//           </div>
//           <p className={styles.paragraph}>
//             Procesador Intel Core i9-11900H. Tarjeta gráfica NVIDIA GeForce RTX
//             3050 (Laptop, 65W). Pantalla de 15.6″, 2.8K (2880 x 1620), 120 Hz,
//             OLED. Memoria de 1000GB SSD. Memoria RAM de 16GB DDR4. Peso de 1.75
//             kg (3.9 lbs)
//           </p>
//           <div className={styles.icons}>
//             <button onClick={() => setModalOpen(!modalOpen)}>
//               <span className="icon-pen1"></span>
//             </button>
//             <button>
//               <span className="icon-bin"></span>
//             </button>
//           </div>
//           <ModalContainer modalOpen={modalOpen} setModalOpen={setModalOpen} />
//         </div>
//       </div>
