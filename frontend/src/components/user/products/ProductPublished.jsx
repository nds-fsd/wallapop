import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteProduct, getProductByUser } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import styles from "./products.module.css";
import Images from "./Image/Images";
import ModalContainer from "../../product/ModalContainer/ModalContainer";
import ImagesList from "./Image/ImagesList";
import CustomAlert from "../../CustomAlert/CustomAlert";
import { Link } from "react-router-dom";

const ProductPublished = () => {
  const { data: prods, isLoading } = useQuery({
    queryKey: ["products_published"],
    queryFn: getProductByUser,
  });
  console.log("los productos", prods);

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

  const queryClient = useQueryClient(["product"]);
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient?.invalidateQueries(["product", id]);
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
      {/* {isLoading && (
        <div>
          <Spinner />
        </div>
      )} */}
      <div className={styles.gridList}>
        <button onClick={toggleView}>
          <span className="icon-table2"></span>
        </button>
        <button onClick={toggleView}>
          <span className="icon-list2"></span>
        </button>
      </div>
      {/* <div className={styles.container}> */}
      <div>
        {gridOpen ? (
          <div className={styles.gridContainer} data-test="productos">
            {prods &&
              prods.map((prod) => (
                <div className={styles.card} data-test="producto" key={prod._id}>
                  {prods && <Images images={prod.images} status={prod.status}/>}
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
                    {/* <h5>{prod.category}</h5> */}
                    <p>{prod.status}</p>
                  </div>
                  {Array.isArray(prod.keywords) && prod.keywords.length > 0 && (
                    <div className={styles.keywords}>
                      {prod.keywords.map((keyword, _id) => (
                        <p key={_id}>{`#${keyword}`}</p>
                      ))}
                    </div>
                  )}

                  
                  <p className={styles.paragraph}>{prod.description}</p>
                  <div className={styles.icons}>
                    <button onClick={() => handleClick(prod._id)}>
                      <span className="icon-pen1"></span>
                    </button>
                    <button onClick={() => handleDeletion(prod._id)}>
                      <span className="icon-bin"></span>
                    </button>
                    <Link to={`/category/product/${prod._id}`} target="_blank">
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
              ))}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {prods &&
              prods.map((prod) => (
                <div className={styles.list} key={prod._id}>
                  <div className={styles.imgList}>
                    {prods && <ImagesList images={prod.images}  />}
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
                    <Link to={`/category/product/${prod._id}`} target="_blank">
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
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPublished;
