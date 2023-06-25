import React, { useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProduct, getProductByUser } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import styles from "./products.module.css";
import ModalContainer from "../../product/ModalContainer/ModalContainer";
import { Link } from "react-router-dom";
import Images from "../Image/Images";
import ImagesList from "../Image/ImagesList";

const ProductPublished = () => {
  const { data: prods, isLoading } = useQuery({
    queryKey: ["products_published"],
    queryFn: getProductByUser,
  });

  console.log("los prods", prods)

  const [modalOpen, setModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [gridOpen, setGridOpen] = useState(true);
  const [deletionAlert, setDeletionAlert] = useState(false);
  const [delProduct, setDelProduct] = useState(null);

  const toggleView = () => {
    setGridOpen(!gridOpen);
  };

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleClick = (id) => {
    setIdProduct(id);
    openModal();
  };

  const queryClient = useQueryClient(["products_published"]);
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient?.invalidateQueries(["products_published"]);
    },
  });

  const handleDeletionProd = (id) => {
    setDelProduct(id);
    setDeletionAlert(true);
  };
  const handleCancel = () => {
    setDeletionAlert(false);
  };

  const handleConfirmDeletion = (id) => {
    const updatedProduct = prods.find((prod) => prod._id === id);
    if (!updatedProduct) return;
    mutation.mutate(id);
    window.location.reload();
  };

  return (
    <>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      <div className={styles.gridList}>
        <button onClick={toggleView}>
          <span className="icon-table2"></span>
        </button>
        <button onClick={toggleView}>
          <span className="icon-list2"></span>
        </button>
      </div>
      <div>
        {gridOpen ? (
          <div className={styles.gridContainer} data-test="productos">
            {prods && prods.length > 0 ? (
              prods.map(
                (prod) =>
                  !prod.sold && (
                    <div
                      className={styles.card}
                      data-test="producto"
                      key={prod._id}
                    >
                      {deletionAlert && delProduct === prod._id && (
                      <div className={styles.alert}>
                        "Estás a punto de borrar este producto. ¿Deseas continuar?"
                        <div className={styles.alertButtons}>
                          <button
                            onClick={() => handleConfirmDeletion(prod._id)}
                            className={styles.accept}
                          >
                            Aceptar
                          </button>
                          <button
                            onClick={handleCancel}
                            className={styles.accept}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                      {prods && (
                        <Images images={prod.images} status={prod.status} />
                      )}
                      <div className={styles.titleContainer}>
                        <h4 className={styles.title}>{prod.title}</h4>
                        <h4>
                          {prod.price.toLocaleString("es-ES", {
                            useGrouping: true,
                          })}{" "}
                          €
                        </h4>
                      </div>
                      <div className={styles.details}>
                        <div>
                          {prod.categories.map((category) => (
                            <h5 key={category._id}>{category.title}</h5>
                          ))}
                        </div>
                        <p>{prod.status}</p>
                      </div>
                      {Array.isArray(prod.keywords) &&
                        prod.keywords.length > 0 && (
                          <div className={styles.keywords}>
                            {prod.keywords.map((keyword, _id) => (
                              <p key={_id}>{`#${keyword}`}</p>
                            ))}
                          </div>
                        )}

                      <p className={styles.paragraph}>{prod.description}</p>
                      <div className={styles.icons}>
                        <button className={styles.logo}  onClick={() => handleClick(prod._id)}>
                          <span className="icon-pen1"></span>
                        </button>
                        <button className={styles.logo} onClick={() => handleDeletionProd(prod._id)}>
                          <span className="icon-bin"></span>
                        </button>
                        <Link
                          to={`/category/product/${prod._id}`}
                          target="_blank"
                        >
                          <button>
                            <span className="icon-eye1"></span>
                          </button>
                        </Link>

                        {
                          <ModalContainer
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            id={idProduct}
                          />
                        }
                      </div>
                    </div>
                  )
              )
            ) : (
              <div>Aún no tienes productos publicados</div>
            )}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {prods && prods.length > 0 ? (
              prods.map(
                (prod) =>
                  !prod.sold && (
                    <div className={styles.list} key={prod._id}>
                      {deletionAlert && delProduct === prod._id && (
                      <div className={styles.alert}>
                        "Estás a punto de borrar este producto. ¿Deseas continuar?"
                        <div className={styles.alertButtons}>
                          <button
                            onClick={() => handleConfirmDeletion(prod._id)}
                            className={styles.accept}
                          >
                            Aceptar
                          </button>
                          <button
                            onClick={handleCancel}
                            className={styles.accept}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                      <div className={styles.imgList}>
                        {prods && <ImagesList images={prod.images} />}
                      </div>

                      <div className={styles.detailsContainer}>
                        <div className={styles.titleContainer}>
                          <h4 className={styles.titleList}>{prod.title}</h4>
                          <h4>
                            {prod.price.toLocaleString("es-ES", {
                              useGrouping: true,
                            })}{" "}
                            €
                          </h4>
                        </div>
                        <p className={styles.paragraph}>{prod.description}</p>
                      </div>
                      <div className={styles.iconsList}>
                        <button onClick={() => handleClick(prod._id)}>
                          <span className="icon-pen1"></span>
                        </button>
                        <button onClick={() => handleDeletionProd(prod._id)}>
                          <span className="icon-bin"></span>
                        </button>
                        <Link
                          to={`/category/product/${prod._id}`}
                          target="_blank"
                        >
                          <button>
                            <span className="icon-eye1"></span>
                          </button>
                        </Link>
                        {
                          <ModalContainer
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            id={idProduct}
                          />
                        }
                      </div>
                    </div>
                  )
              )
            ) : (
              <div>Aún no tienes productos publicados</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPublished;
