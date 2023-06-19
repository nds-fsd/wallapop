import React, { useState, useContext } from "react";
import styles from "./productPage.module.css";
import stylesDark from "./productPageDark.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import { getProductById, updateProduct } from "../../../utils/apiProducts";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken } from "../../../utils/localStorage.utils";
import { ThemeContext } from "../../../context/themeContext";

const VehiclePage = ({ id }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const mockImages = [
    "https://picsum.photos/id/1/700/500",
    "https://picsum.photos/id/2/700/500",
    "https://picsum.photos/id/3/700/500",
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const { data, isLoading } = useQuery(["product", id], getProductById);
  const category = data.categories;

  const [favorite, setFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(updateProduct, {
    onSuccess: (updatedProduct) => {
      setFavorite(updatedProduct.favorite);
      setShowAlert(true);
      queryClient.setQueryData(["product", id], updatedProduct);
    },
  });

  const handleAlertAccept = () => {
    setShowAlert(false);
  };

  const handleSessionAlert = () => {
    setSessionAlert(false);
    navigate("/user/login");
  };

  const handleFavorite = async () => {
    const userToken = localStorage.getItem("user-session");

    if (userToken) {
      // console.log(userToken)
      const updatedFavorite = !favorite;
      setFavorite(updatedFavorite);
      const updatedProduct = { ...data, favorite: updatedFavorite };

      try {
        await mutation.mutateAsync(updatedProduct);
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

  return (
    <>
      {data && sessionAlert && (
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
      {data && showAlert && (
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
      <div className={darkMode ? stylesDark.productPage : styles.productPage}>
        <div className={darkMode ? stylesDark.container : styles.container}>
          <div className={darkMode ? stylesDark.upperBar : styles.upperBar}>
            <div className={darkMode ? stylesDark.user : styles.user}>
              <h3>{data && data?.user?.name}</h3>
              <div
                className={darkMode ? stylesDark.background : styles.background}
              >
                <img
                  src={data?.user?.photo}
                  className={darkMode ? stylesDark.userPhoto : styles.userPhoto}
                ></img>
              </div>
            </div>
            <div className={darkMode ? stylesDark.buttons : styles.buttons}>
              <button
                onClick={handleFavorite}
                className={`${styles.like} ${favorite ? styles.focused : ""}`}
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
                  data.price?.toLocaleString("es-ES", {
                    useGrouping: true,
                  })}{" "}
              </h1>
              <h2>EUR</h2>
            </div>

            <div className={darkMode ? stylesDark.category : styles.category}>
              {data.categories &&
                category.map((cat) => <span className={cat.logo} />)}
              <h3>{data && data.category}</h3>
            </div>
          </div>

          <h2>{data && data.title}</h2>
          {data && <Keywords data={data} />}

          {data.brand || data.model || data.year || data.doors || data.seats ? (
            <div
              className={darkMode ? stylesDark.detailType : styles.detailType}
            >
              {data.brand && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.brand}
                </p>
              )}
              {data.model && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.model}
                </p>
              )}
              {data.year && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.year}
                </p>
              )}
              {data.doors && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.doors} puertas
                </p>
              )}
              {data.seats && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.seats} plazas
                </p>
              )}
            </div>
          ) : null}
          {data.km || data.engine || data.shift ? (
            <div
              className={darkMode ? stylesDark.detailType2 : styles.detailType2}
            >
              {data.km && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.km.toLocaleString("es-ES", { useGrouping: true })} Km
                </p>
              )}
              {data.engine && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.engine}
                </p>
              )}
              {data.shift && (
                <p className={darkMode ? stylesDark.detail : styles.detail}>
                  {data.shift}
                </p>
              )}
            </div>
          ) : null}

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
          {isExpanded ? "" : ""}
          {isExpanded && (
            <p
              className={
                darkMode ? stylesDark.textExpanded : styles.textExpanded
              }
            >
              {data && data.description}
            </p>
          )}
          <div
            className={
              darkMode ? stylesDark.linksContainer : styles.linksContainer
            }
          >
            <div className={darkMode ? stylesDark.links : styles.links}>
              <span className="icon-credit-card1"></span>
              <h5>Calcula tu préstamo</h5>
              <Link to="https://www.creditea.es/" target="_blank">
                <img src="C:\Users\anank\Documents\Ananke85\wallapop\frontend\src\assets\carfax.png"></img>
              </Link>
            </div>
            <div className={darkMode ? stylesDark.links : styles.links}>
              <span className="icon-file-text2"></span>
              <h5>Historial del vehículo</h5>
              <Link to="https://shorturl.at/qxG89" target="_blank">
                <img src="C:\Users\anank\Documents\Ananke85\wallapop\frontend\src\assets\carfax.png"></img>
              </Link>
            </div>
            <div className={darkMode ? stylesDark.links : styles.links}>
              <span className="icon-coin-euro"></span>
              <h5>Calcula tu seguro</h5>
              <Link to="https://www.mapfre.es/particulares/" target="_blank">
                <img src="C:\Users\anank\Documents\Ananke85\wallapop\frontend\src\assets\carfax.png"></img>
              </Link>
            </div>
          </div>

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

export default VehiclePage;
