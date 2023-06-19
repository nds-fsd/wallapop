import React, { useContext, useState } from "react";
import styles from "./productPage.module.css";
import stylesDark from "./productPageDark.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import { getProductById, updateProduct } from "../../../utils/apiProducts";
import { Link, useNavigate } from "react-router-dom";
import { changeFavorite } from "../../../utils/apiFavorites";
import { getUserToken } from "../../../utils/localStorage.utils";
import { ThemeContext } from "../../../context/themeContext";

const ElsePage = ({ id }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const mockImages = [
    "https://picsum.photos/id/1/500/500",
    "https://picsum.photos/id/2/700/500",
    "https://picsum.photos/id/3/700/500",
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const { data, isLoading } = useQuery(["product", id], getProductById);
  const category = data?.categories;

  // console.log(data);
  const [isFavorite, setIsFavorite] = useState(data?.favorite || false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(changeFavorite, {
    onSuccess: (updatedFavorite) => {
      if (updatedFavorite !== undefined) {
        setIsFavorite(updatedFavorite);
        queryClient.setQueryData(["product", id], {
          ...data,
          favorite: updatedFavorite,
        });
        setShowAlert(true);
      } else {
        setSessionAlert(true);
        setShowAlert(false);
      }
    },
  });

  const handleAlertAccept = () => {
    setShowAlert(false);
  };

  const handleSessionAlert = () => {
    setSessionAlert(false);
    navigate("/user/login");
  };

  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  console.log("el id del user", userId);

  const handleFavorite = async () => {
    const { userToken } = getUserToken();

    if (userToken) {
      console.log(userToken);
      const updatedFavorite = !favorite;
      setFavorite(updatedFavorite);
      const updatedProduct = { ...data, favorite: updatedFavorite };

      try {
        await mutation.mutateAsync(favoriteData);
        console.log("el producto cambiado", favoriteData);

        setSessionAlert(false);
        setShowAlert(true);
      } catch (error) {
        setSessionAlert(true);
        setShowAlert(false);
      }
    } else {
      setSessionAlert(true);
      setShowAlert(false);
    }
  };

  //Cuando todos los productos tengan asociado categories (title, logo...)
  //junto con el div que tiene el Link
  // const title = data?.categories[0].title
  // console.log("el titulo de la categoria", title)

  return (
    <>
      {data && !userId && sessionAlert && (
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
      {data && isFavorite && showAlert && (
        <div className={darkMode ? stylesDark.alert : styles.alert}>
          {isFavorite
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
      <div className={darkMode ? stylesDark.productPage : styles.productPage}>
        <div className={darkMode ? stylesDark.container : styles.container}>
          <div className={darkMode ? stylesDark.upperBar : styles.upperBar}>
            {data && data?.user && (
              <div className={darkMode ? stylesDark.user : styles.user}>
                <h3>{data?.user?.name}</h3>
                <div
                  className={
                    darkMode ? stylesDark.background : styles.background
                  }
                >
                  <img
                    src={data?.user?.photo}
                    className={
                      darkMode ? stylesDark.userPhoto : styles.userPhoto
                    }
                  />
                </div>
              </div>
            )}
            <div className={darkMode ? stylesDark.buttons : styles.buttons}>
              <button
                onClick={handleFavorite}
                className={`${styles.like} ${isFavorite ? styles.focused : ""}`}
              >
                <span className="icon-heart1"></span>
              </button>
              <button className={darkMode ? stylesDark.chat : styles.chat}>
                CHAT
              </button>
            </div>
          </div>

          {data && <Slider images={data.images} data={data} />}
          <div className={darkMode ? stylesDark.details : styles.details}>
            <div
              className={
                darkMode ? stylesDark.priceContainer : styles.priceContainer
              }
            >
              <h1 className={darkMode ? stylesDark.price : styles.price}>
                {data &&
                  data.price?.toLocaleString("es-ES", { useGrouping: true })}
              </h1>
              <h2>EUR</h2>
            </div>
            <div className={darkMode ? stylesDark.category : styles.category}>
              {category && category.map((cat) => <span className={cat.logo} />)}
              <h3>{data && data.category}</h3>
            </div>
          </div>

          <h2>{data && data.title}</h2>
          {data && <Keywords data={data} />}

          <div className={darkMode ? stylesDark.line : styles.line}></div>
          <div className={darkMode ? stylesDark.expandable : styles.expandable}>
            <h3>DESCRIPCIÓN DEL PRODUCTO</h3>
            <button
              onClick={handleExpandClick}
              className={
                darkMode && !isExpanded
                  ? stylesDark.arrow
                  : stylesDark.active && darkMode && isExpanded
                  ? stylesDark.active
                  : stylesDark.arrow && !darkMode && isExpanded
                  ? styles.arrow
                  : styles.active
              }
            >
              <span className="icon-circle-down"></span>
            </button>
          </div>
          {isExpanded && (
            <p
              className={
                darkMode ? stylesDark.textExpanded : styles.textExpanded
              }
            >
              {data && data.description}
            </p>
          )}

          <div className={darkMode ? stylesDark.media : styles.media}>
            <p>Comparte este producto con tus amigos</p>
            <div
              className={darkMode ? stylesDark.mediaIcons : styles.mediaIcons}
            >
              <span className="icon-facebook2"></span>
              <span className="icon-twitter"></span>
              <span className="icon-whatsapp"></span>
              <span className="icon-mail2"></span>
            </div>
          </div>
          {data && <ProductBar data={data} />}
        </div>
      </div>
    </>
  );
};

export default ElsePage;
