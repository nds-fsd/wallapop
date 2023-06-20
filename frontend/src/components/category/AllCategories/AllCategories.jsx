import React, { useState } from "react";
import styles from "./allCategories.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllProducts, updateProduct } from "../../../utils/apiProducts";
import ImagesHome from "../../user/products/Image/ImagesHome";
import { Link, useNavigate } from "react-router-dom";

const AllCategories = () => {
  const { data: prods, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const [showAll, setShowAll] = useState(false);
  const visibleProductsCount = showAll ? prods.length : 20;
  const visibleProducts = prods?.slice(0, visibleProductsCount);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const [favorite, setFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(updateProduct, {
    onSuccess: (updatedProduct) => {
      setFavorite(!updatedProduct.favorite);
      setShowAlert(true);
      queryClient?.setQueryData(
        ["product", updatedProduct._id],
        updatedProduct
      );
      refetch();
      setShowAlert(true);
    },
  });

  const handleAlertAccept = () => {
    setShowAlert(false);
  };

  const handleSessionAlert = () => {
    setSessionAlert(false);
    navigate("/user/login");
  };

  const handleFavorite = async (id) => {
    const updatedProduct = prods.find((prod) => prod._id === id);

    if (!updatedProduct) return;
    const userToken = localStorage.getItem("user-session");
    if (userToken) {
      try {
        const updatedFavorite = !updatedProduct.favorite;
        const updatedProductData = {
          ...updatedProduct,
          favorite: updatedFavorite,
        };

        await mutation.mutateAsync(updatedProductData);
        const updatedProducts = prods.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        );
        setFavorite(updatedFavorite);
        setShowAlert(true);
        setSessionAlert(false);
        queryClient.setQueryData(["products"], updatedProducts);
      } catch (error) {
        setShowAlert(false);
        setSessionAlert(true);
      }
    } else {
      setShowAlert(false);
      setSessionAlert(true);
    }
  };

  return (
    <>
      <h1 className={styles.genTitle}>Los productos más destacados</h1>
      {sessionAlert && (
        <div className={styles.alert}>
          Debes iniciar sesión para ejecutar esta acción
          <div className={styles.alertButtons}>
            <button onClick={handleSessionAlert} className={styles.accept}>
              Aceptar
            </button>
            <button
              onClick={() => setSessionAlert(false)}
              className={styles.accept}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {showAlert && (
        <div className={styles.alert}>
          {favorite
            ? "Este producto se ha añadido a tu lista de favoritos"
            : "Este producto ya no está entre tus favoritos"}
          <button onClick={handleAlertAccept} className={styles.accept}>
            Aceptar
          </button>
        </div>
      )}
      <div className={styles.gridContainer}>
        {visibleProducts?.map((prod) => (
          <div key={prod._id} className={styles.card}>
            {prods && (
              <ImagesHome
                images={prod.images}
                className={styles.images}
                category={prod.categories}
                status={prod.status}
              />
            )}
            <div className={styles.titleContainer}>
              <div className={styles.priceContainer}>
                <h5>
                  {prod.price.toLocaleString("es-ES", {
                    useGrouping: true,
                  })}
                  €
                </h5>
                <Link
                  data-test="card_prod"
                  to={`/category/product/${prod._id}`}
                  target="_blank"
                  className={styles.eye}
                >
                  <button>
                    <span className="icon-eye1"></span>
                  </button>
                </Link>
                <button
                  onClick={() => handleFavorite(prod._id)}
                  className={`${styles.like} ${
                    prod.favorite ? styles.focused : ""
                  }`}
                >
                  <span className="icon-heart1"></span>
                </button>
              </div>
              <p className={styles.title}>{prod.title}</p>
            </div>
          </div>
        ))}
      </div>
      {prods && prods.length > 20 && (
        <button onClick={toggleShowAll} className={styles.view}>
          {showAll ? "Mostrar menos" : "Mostrar más"}
        </button>
      )}
    </>
  );
};

export default AllCategories;
