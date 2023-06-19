import React, { useState, useContext } from "react";
import styles from "./allCategories.module.css";
import stylesDark from "./allCategoriesDark.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllProducts, updateProduct } from "../../../utils/apiProducts";
import ImagesHome from "../../user/Image/ImagesHome";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/themeContext";

const AllCategories = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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

  // console.log(prods);

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
    // console.log("paso por la funcion de favorite");
    const updatedProduct = prods.find((prod) => prod._id === id);

    if (!updatedProduct) return;
    const userToken = localStorage.getItem("user-session");
    if (userToken) {
      console.log("este el el token del user", userToken);

      try {
        // console.log(userToken);
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
    // console.log("hecho el favorite");
  };

  return (
    <>
      <h1 className={darkMode ? stylesDark.genTitle : styles.genTitle}>
        Los productos más destacados
      </h1>
      {sessionAlert && (
        <div className={darkMode ? stylesDark.alert : styles.alert}>
          Debes iniciar sesión para ejecutar esta acción
          <div
            className={darkMode ? stylesDark.alertButtons : styles.alertButtons}
          >
            <button
              onClick={handleSessionAlert}
              className={darkMode ? stylesDark.accept : styles.accept}
            >
              Aceptar
            </button>
            <button
              onClick={() => setSessionAlert(false)}
              className={darkMode ? stylesDark.accept : styles.accept}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {showAlert && (
        <div className={darkMode ? stylesDark.alert : styles.alert}>
          {favorite
            ? "Este producto se ha añadido a tu lista de favoritos"
            : "Este producto ya no está entre tus favoritos"}
          <button
            onClick={handleAlertAccept}
            className={darkMode ? stylesDark.accept : styles.accept}
          >
            Aceptar
          </button>
        </div>
      )}
      <div
        className={darkMode ? stylesDark.gridContainer : styles.gridContainer}
      >
        {visibleProducts?.map(
          (prod) =>
            // Añado esto para que no se muestren los productos con sold = true
            !prod.sold && (
              <div
                key={prod._id}
                className={darkMode ? stylesDark.card : styles.card}
              >
                {prods && (
                  <ImagesHome
                    images={prod.images}
                    className={darkMode ? stylesDark.images : styles.images}
                    category={prod.categories}
                    status={prod.status}
                  />
                )}
                <div
                  className={
                    darkMode ? stylesDark.titleContainer : styles.titleContainer
                  }
                >
                  <div
                    className={
                      darkMode
                        ? stylesDark.priceContainer
                        : styles.priceContainer
                    }
                  >
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
                      className={darkMode ? stylesDark.eye : styles.eye}
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
                  <p className={darkMode ? stylesDark.title : styles.title}>
                    {prod.title}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
      {prods && prods.length > 20 && (
        <button
          onClick={toggleShowAll}
          className={darkMode ? stylesDark.view : styles.view}
        >
          {showAll ? "Mostrar menos" : "Mostrar más"}
        </button>
      )}
    </>
  );
};

export default AllCategories;
