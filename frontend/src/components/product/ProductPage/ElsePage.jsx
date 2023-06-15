import React, { useEffect, useRef, useState } from "react";
import styles from "./productPage.module.css";
import { useQuery } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import { getProductById } from "../../../utils/apiProducts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createFav, deleteFav, getFavs } from "../../../utils/apiFavorites";
import RelatedProducts from "./RelatedProducts";
import { getUserData, getUserToken } from "../../../utils/localStorage.utils";

const ElsePage = ({ id }) => {
  const { data, isLoading } = useQuery(["product", id], getProductById);
  const category = data?.categories;
  const title = data?.categories[0].title;
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = getUserToken();
  const userData = getUserData();
  const userId = userData ? userData.id : null;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);
  // const [previousProductPage, setPreviousProductPage] = useState(null);

  // const previousProductPage = localStorage.getItem("previousProductPage")


  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAlertAccept = () => {
    setShowAlert(false);
  };

  const handleSessionAlert = () => {
    setSessionAlert(false);
    // localStorage.setItem("previousProductPage", location.pathname);    
    navigate("/user/login");
  };

  const handleFavorite = async () => {
    if (!userId) {
      setSessionAlert(true);
      setShowAlert(false);
      return;
    }
    try {
      if (isFavorite) {
        await deleteFav(data._id );
        setIsFavorite(false);
        setShowAlert(true);
      } else {
        await createFav({ product: data._id });
        setIsFavorite(true);
        setShowAlert(true);
      }
    } catch (error) {
      console.log("Error toggling favorite:", error);
    }
  };

  // useEffect(() => {
  //   const fetchFavoriteStatus = async () => {
  //     try {
  //       if (userToken) {
  //         const favorites = await getFavs(userId);
  //         const isProductFavorite = favorites.some(
  //           (favorite) => favorite.product === data._id
  //         );
  //         setIsFavorite(isProductFavorite);
  //       }
  //     } catch (error) {
  //       console.log("Error fetching favorite status:", error);
  //     }
  //   };
  //   fetchFavoriteStatus();
  // }, [data.id, userToken]);

  // useEffect(() => {
  //   if (userToken && previousProductPage) {
  //     localStorage.removeItem("previousProductPage");
  //     navigate(previousProductPage);
  //   }
  // }, []);
 

  return (
    <>
      {data && !userToken && sessionAlert && (
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
      {data && showAlert && (
        <div className={styles.alert}>
          {isFavorite
            ? "Este producto se ha añadido a tu lista de favoritos"
            : "Este producto ya no está entre tus favoritos"}
          <button onClick={handleAlertAccept} className={styles.accept}>
            Aceptar
          </button>
        </div>
      )}
      <div className={styles.productPage}>
        <div className={styles.container}>
          <div className={styles.upperBar}>
            {data && data?.user && (
              <div className={styles.user}>
                <h3>{data?.user?.name}</h3>
                <div className={styles.background}>
                  <img src={data?.user?.photo} className={styles.userPhoto} />
                </div>
              </div>
            )}
            <div className={styles.buttons}>
              <button
                onClick={handleFavorite}
                className={`${styles.like} ${isFavorite ? styles.focused : ""}`}
              >
                <span className="icon-heart1"></span>
              </button>
              <button className={styles.chat}>CHAT</button>
            </div>
          </div>

          {data && <Slider images={data.images} data={data} />}
          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <h1 className={styles.price}>
                {data &&
                  data.price?.toLocaleString("es-ES", { useGrouping: true })}
              </h1>
              <h2>EUR</h2>
            </div>
            <div className={styles.category}>
              <Link to={"/category/" + title}>
                {data.categories &&
                  category.map((cat) => (
                    <span className={cat.logo} key={cat._id} />
                  ))}
                <h3>{data && data.category}</h3>
              </Link>
            </div>
            {/* <div className={styles.category}>
              {category && category.map((cat) => <span className={cat.logo} key={cat._id} />)}
              <h3>{data && data.category}</h3>
            </div> */}
          </div>

          <h2>{data && data.title}</h2>
          {data && <Keywords data={data} />}

          <div className={styles.line}></div>
          <div className={styles.expandable}>
            <h3>DESCRIPCIÓN DEL PRODUCTO</h3>
            <button
              onClick={handleExpandClick}
              className={!isExpanded ? styles.arrow : styles.active}
            >
              <span className="icon-circle-down"></span>
            </button>
          </div>
          {isExpanded && (
            <p className={styles.textExpanded}>{data && data.description}</p>
          )}

          <div className={styles.media}>
            <p>Comparte este producto con tus amigos</p>
            <div className={styles.mediaIcons}>
              <span className="icon-facebook2"></span>
              <span className="icon-twitter"></span>
              <span className="icon-whatsapp"></span>
              <span className="icon-mail2"></span>
            </div>
          </div>
          {data && <ProductBar data={data} />}
        </div>
        {data && (
          <RelatedProducts category={data.category} parentId={data._id} />
        )}
      </div>
    </>
  );
};

export default ElsePage;
