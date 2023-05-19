import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProduct, getProductByUser } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import styles from "./products.module.css";
import Images from "./Image/Images";
import ModalContainer from "../../product/ModalContainer/ModalContainer";


const ProductPublished = () => {
 

  const { data: prods, isLoading } = useQuery({
    queryKey: ["products_published"],
    queryFn: getProductByUser,
  });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState('') 

  const openModal = () => {
    setModalOpen(!modalOpen)
  };
 
  const handleClick = (id) => {
    console.log("el id del producto", id)
    setIdProduct(id)
    openModal();
  }

  const queryClient = useQueryClient(["product"]);
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient?.invalidateQueries(["product", id]);
    },
  });

  const handleDeletion = (product) => {
    mutation.mutate(product);
    alert("Estás a punto de borrar un producto. ¿Deseas continuar?")
  };


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
                  <h4 className={styles.title}>{prods && prod.title}</h4>
                  <h4>{prods && prod.price.toLocaleString('es-ES', {useGrouping: true})} €</h4>
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
                  <button onClick={() => handleClick(prod._id)}><span className="icon-pen1"></span></button>
                  <button onClick={() => handleDeletion(prod._id)}><span className="icon-bin"></span></button>
                  {prods && <ModalContainer modalOpen={modalOpen} setModalOpen={setModalOpen} id={idProduct}/>}
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
