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

  const [modalOpen, setModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [gridOpen, setGridOpen] = useState(true);

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
      window.location.reload();
    },
  });

  const handleDeletion = (id) => {
    const shouldDelete = window.confirm(
      "Estás a punto de borrar este producto. ¿Deseas continuar?"
    );
    if (shouldDelete) {
      mutation.mutate(id);
    }
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
                        <button
                          className={styles.logo}
                          onClick={() => handleClick(prod._id)}
                        >
                          <span className="icon-pen1"></span>
                        </button>
                        <button
                          className={styles.logo}
                          onClick={() => handleDeletion(prod._id)}
                        >
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
                        <ModalContainer
                          modalOpen={modalOpen}
                          setModalOpen={setModalOpen}
                          id={idProduct}
                        />
                      </div>
                    </div>
                  )
              )
            ) : (
              <div className={styles.sinProducts}>
                <h3>Aún no tienes productos</h3>
                <h5>
                  Créenos, es muuucho mejor cuando vendes cosas. ¡Sube algo que
                  quieras vender! 💸
                </h5>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {prods && prods.length > 0 ? (
              prods.map(
                (prod) =>
                  !prod.sold && (
                    <div className={styles.list} key={prod._id}>
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
                        <button onClick={() => handleDeletion(prod._id)}>
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
              <div className={styles.sinProducts}>
                <h3>Aún no tienes productos</h3>
                <h5>
                  Créenos, es muuucho mejor cuando vendes cosas. ¡Sube algo que
                  quieras vender! 💸
                </h5>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPublished;
