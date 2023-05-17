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
  const [isEditing, setIsEditing] = useState(false)

  const openModal = () => {
    setModalOpen(!modalOpen)
  };
  const handleEdit = () => {
  //   la funcion del edit
  //   reset({title, price, keywords, description, status, location, images})

    setIsEditing(!isEditing)
  };
  const handleClick = () => {
    openModal();
    handleEdit();    
  }


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
                  <div>
                    {prod.categories.map((category) => (
                      <h5 key={category._id}>{category.title}</h5>
                    ))}
                  </div>
                  {/* <h5>Informática y Electrónica</h5> */}
                  <p>{prods && prod.status}</p>
                </div>
                {Array.isArray(prod.keywords) && prod.keywords !== ' ' && (
                  <div className={styles.keywords}>
                  {prod.keywords.map((keyword, _id) => (
                    <p key={keyword._id}>{`#${keyword}`}</p>
                  ))}
                </div>
                )}
                <p className={styles.paragraph}>{prods && prod.description}</p>
                <div className={styles.icons}>
                  {/* <button onClick={() => setModalOpen(!modalOpen)}><span className="icon-pen1"></span></button> */}
                  <button onClick={handleClick}><span className="icon-pen1"></span></button>
                  <button><span className="icon-bin"></span></button>
                  {prods && <ModalContainer modalOpen={modalOpen} setModalOpen={setModalOpen} prod={prod}/>}
                </div>
              </div>
            // </div>
          )
        })
      )}

      {/* {isEditing && (
        <div>
          {prods && <ModalContainer modalOpen={modalOpen} setModalOpen={setModalOpen} prod={prod}/>}
        </div>
      )} */}
    </div>
    </>
  );
};

export default ProductPublished;
