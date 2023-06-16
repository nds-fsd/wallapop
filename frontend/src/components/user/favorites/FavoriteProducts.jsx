import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styles from "../../user/products/products.module.css";
import Images from "../products/Image/Images";
import { Link } from "react-router-dom";
import { deleteFav, getFavs } from "../../../utils/apiFavorites";
import ImagesList from "../products/Image/ImagesList";

const FavoriteProducts = () => {
  const { data } = useQuery("fav-prods", getFavs);
  const favs = data && data[0].products;
  const [deletionAlert, setDeletionAlert] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [gridOpen, setGridOpen] = useState(true);
  const toggleView = () => {
    setGridOpen(!gridOpen);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteFav, {
    onSuccess: () => {
      setDeletionAlert(true);
      queryClient.setQueryData(["fav-prods"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCancel = () => {
    setDeletionAlert(false);
  };

  const handleDeletionFav = (id) => {
    setDeleteProduct(id);
    setDeletionAlert(true);
  };

  const handleConfirmDeletion = (id) => {
    const updatedProduct = favs.find((fav) => fav._id === id);
    if (!updatedProduct) return;
    console.log("el id del producto", id);
    mutation.mutate(id);
    window.location.reload();
  };

  

  return (
    <>
      <div className={styles.gridList}>
        <button onClick={toggleView}>
          <span className="icon-table2"></span>
        </button>
        <button onClick={toggleView}>
          <span className="icon-list2"></span>
        </button>
      </div>

      {gridOpen ? (
        <div className={styles.gridContainer}>
          {data && favs.length > 0 ? (
            favs.map((fav) => (
              <div key={fav._id} className={styles.card}>
                {deletionAlert && deleteProduct === fav._id && (
                  <div className={styles.alert}>
                    Estás a punto de eliminar este producto de tus favoritos.
                    ¿Deseas continuar?
                    <div className={styles.alertButtons}>
                      <button
                        onClick={() => handleConfirmDeletion(fav._id)}
                        className={styles.accept}
                      >
                        Aceptar
                      </button>
                      <button onClick={handleCancel} className={styles.accept}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
                {data && <Images images={fav.images} />}
                <div className={styles.titleContainer}>
                  <h4 className={styles.title}>{fav.title}</h4>
                  <h4>
                    {fav.price?.toLocaleString("es-ES", {
                      useGrouping: true,
                    })}
                    €
                  </h4>
                </div>
                <div className={styles.details}>
                  <h5>{fav.category}</h5>
                  <p>{fav.status}</p>
                </div>
                {Array.isArray(fav.keywords) && fav.keywords.length > 0 && (
                  <div className={styles.keywords}>
                    {fav.keywords.map((keyword, index) => (
                      <p key={index}>{`#${keyword}`}</p>
                    ))}
                  </div>
                )}
                <p className={styles.paragraph}>{fav.description}</p>
                <div className={styles.icons}>
                  <button
                    onClick={() => handleDeletionFav(fav._id)}
                    className={styles.heart}
                  >
                    <span className="icon-heart-broken"></span>
                  </button>
                  <Link to={`/category/product/${fav._id}`} target="_blank">
                    <button>
                      <span className="icon-eye1"></span>
                    </button>
                  </Link>
                  <div className={styles.comprar}>
                    <button>Comprar ya</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Aún no tienes productos favoritos</div>
          )}
        </div>
      ) : (
        <div className={styles.listContainer}>
          {data && favs.length > 0 ? (
            favs.map((fav) => (
              <div key={fav._id} className={styles.list}>
                {deletionAlert && deleteProduct === fav._id && (
                  <div className={styles.alert}>
                    Estás a punto de eliminar este producto de tus favoritos.
                    ¿Deseas continuar?
                    <div className={styles.alertButtons}>
                      <button
                        onClick={() => handleConfirmDeletion(fav._id)}
                        className={styles.accept}
                      >
                        Aceptar
                      </button>
                      <button onClick={handleCancel} className={styles.accept}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
                <div className={styles.imgList}>
                  {data && <ImagesList images={fav.images} />}
                </div>
                <div className={styles.detailsContainer}>
                  <div className={styles.titleContainer}>
                    <h4 className={styles.titleList}>{fav.title}</h4>
                    <h4>
                      {fav.price?.toLocaleString("es-ES", {
                        useGrouping: true,
                      })}
                      €
                    </h4>
                  </div>
                  <p className={styles.paragraph}>{fav.description}</p>
                </div>

                <div className={styles.unfav}>
                  <div className={styles.iconsList}>
                    <button
                      onClick={() => handleDeletionFav(fav._id)}
                      className={styles.heart}
                    >
                      <span className="icon-heart-broken"></span>
                    </button>
                    <Link to={`/category/product/${fav._id}`} target="_blank">
                      <button>
                        <span className="icon-eye1"></span>
                      </button>
                    </Link>
                  </div>
                  <div className={styles.comprarFav}>
                    <button>Comprar ya</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Aún no tienes productos favoritos</div>
          )}
        </div>
      )}
    </>
  );
};

export default FavoriteProducts;
