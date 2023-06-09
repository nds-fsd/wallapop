import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getFavsByUser } from "../../../utils/apiProducts";
import styles from "../../user/products/products.module.css";
import Images from "../products/Image/Images";
import { Link } from "react-router-dom";
import { updateProduct } from "../../../utils/apiProducts";

const FavoriteProducts = () => {
  const { data: prods } = useQuery({
    queryKey: ["fav_prods"],
    queryFn: getFavsByUser,
  });

  console.log("los prods favs", prods);

  const [favorite, setFavorite] = useState({});
  const [deletionAlert, setDeletionAlert] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const queryClient = useQueryClient();
  const mutation = useMutation(updateProduct, {
    onSuccess: (updatedProduct) => {
      setFavorite(updatedProduct.favorite);
      setDeletionAlert(true);
      queryClient.setQueryData(["product", deleteProduct], updatedProduct);
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
    const updatedProduct = prods.find((prod) => prod._id === id);
    if (!updatedProduct) return;

    console.log("el id del producto", id);

    const shouldDelete = !updatedProduct.favorite;
    setFavorite(shouldDelete);
    const updatedProductData = { ...updatedProduct, favorite: shouldDelete };

    mutation.mutate(updatedProductData, {
      onSuccess: (updatedProduct) => {
        setDeletionAlert(false);
        queryClient?.setQueryData(["product-updated", id, updatedProduct]);
        window.location.reload();
      },
    });
  };

  return (
    <>
      <div className={styles.gridContainer}>
        {prods &&
          prods.map((prod) => (
            <div key={prod._id} className={styles.card}>
              {deletionAlert && deleteProduct === prod._id && (
                <div className={styles.alert}>
                  Estás a punto de eliminar este producto de tus favoritos.
                  ¿Deseas continuar?
                  <div className={styles.alertButtons}>
                    <button
                      onClick={() => handleConfirmDeletion(prod._id)}
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
              {prods && <Images images={prod.images} />}
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
                {/* <div>
                {prod.categories.map((category) => (
                  <h5 key={category._id}>{category.title}</h5>
                ))}
              </div> */}
                <h5>{prod.category}</h5>
                <p>{prod.status}</p>
              </div>
              {Array.isArray(prod.keywords) && prod.keywords !== " " && (
                <div className={styles.keywords}>
                  {prod.keywords.map((keyword, _id) => (
                    <p key={_id}>{`#${keyword}`}</p>
                  ))}
                </div>
              )}
              <p className={styles.paragraph}>{prod.description}</p>
              <div className={styles.icons}>
                <button
                  onClick={() => handleDeletionFav(prod._id)}
                  className={styles.heart}
                >
                  <span className="icon-heart-broken"></span>
                </button>
                <Link to={`/category/product/${prod._id}`} target="_blank">
                  <button>
                    <span className="icon-eye1"></span>
                  </button>
                </Link>
                <div className={styles.comprar}>
                  <button>Comprar ya</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default FavoriteProducts;
