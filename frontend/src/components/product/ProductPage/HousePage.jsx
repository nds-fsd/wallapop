import React, { useEffect, useContext, useState } from "react";
import styles from "./productPage.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import { getProductById, updateProduct } from "../../../utils/apiProducts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import { getUserData, getUserToken } from "../../../utils/localStorage.utils";
import { createFav, deleteFav, getFavs } from "../../../utils/apiFavorites";
import creditea from "../../../assets/images/creditea.png";
import carfax from "../../../assets/images/carfax.png";
import { postChatRoom } from "../../../utils/apiChatRoom";
import { AuthContext } from "../../../context/authContext";

const HousePage = ({ id }) => {
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
  const [userFavorites, setUserFavorites] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState(false);


  useEffect(() => {
    const fetchUserFavs = async () => {
      try {
        const favs = await getFavs(userId);
        const favsProductIds = favs && favs[0].products.map((prod) => prod._id);
        const isProductFavorite = favsProductIds.includes(String(id));
        setUserFavorites(isProductFavorite);
      } catch (error) {
        console.log("Error fetching user favorites", error);
      }
    };
    if (userToken) {
      fetchUserFavs();
    }
  }, [userToken, id]);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAlertAccept = () => {
    setShowAlert(false);
    window.location.reload();
  };

  const handleSessionAlert = () => {
    setSessionAlert(false);
    const previousProductPage = window.location.pathname;
    localStorage.setItem('previousProductPage', previousProductPage);
    navigate("/user/login");
  };

  const handleFavorite = async () => {
    if (!userToken) {
      setSessionAlert(true);
      setShowAlert(false);
      return;
    }
    try {
      if (userFavorites) {
        await deleteFav(id);
        setShowAlert(true);
        setFavoriteStatus(false);
        setIsFavorite(false);
      } else {
        await createFav({ product: id });
        setShowAlert(true);
        setFavoriteStatus(true);
        setIsFavorite(true);
      }
    } catch (error) {
      console.log("Error toggling favorite:", error);
    }
  };


  const handleCreateChatRoom = async () => {
    const body = {
      product_id: data._id,
      owner_id: data.user._id,
      buyer_id: userData.id,
    };

    try {
      const chatroom = await postChatRoom(body);
      navigate(`/user/chatroom/${chatroom._id}`);
    } catch (error) {
      console.log(error);
    }
  };

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
          {favoriteStatus
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
            <div className={styles.user}>
              <h3>{data.user?.name}</h3>
              <div className={styles.background}>
                <img src={data?.user?.photo} className={styles.userPhoto}></img>
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={handleFavorite}
                className={`${styles.like} ${
                  userToken && userFavorites ? styles.focused : ""
                }`}
              >
                <span className="icon-heart1"></span>
              </button>
              {userData?.id !== data?.user._id ? (
                <button className={styles.chat} onClick={handleCreateChatRoom}>
                  CHAT
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          {data && <Slider images={data.images} data={data} />}

          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <h1 className={styles.price}>
                {data &&
                  data.price.toLocaleString("es-ES", { useGrouping: true })}
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
          </div>

          <h2>{data && data.title}</h2>
          {data?.space || data?.rent || data?.land ? (
            <div className={styles.detailType}>
              {data.space && <p className={styles.detail}>{data.space}</p>}
              {data.rent && <p className={styles.detail}>{data.rent}</p>}
              {data.land && <p className={styles.detail}>{data.land} m2</p>}
            </div>
          ) : null}

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
          {isExpanded ? "" : ""}
          {isExpanded && (
            <p className={styles.textExpanded}>{data && data.description}</p>
          )}

          <div className={styles.linksContainerHouse}>
            <div className={styles.links}>
              <span className="icon-credit-card1"></span>
              <h5>Calcula tu préstamo</h5>
              <Link to="https://www.creditea.es/" target="_blank">
                <img src={creditea} className={styles.imgLink} />
              </Link>
            </div>

            <div className={styles.links}>
              <span className="icon-coin-euro"></span>
              <h5>Calcula tu seguro</h5>
              <Link to="https://www.mapfre.es/particulares/" target="_blank">
                <img src={carfax} className={styles.imgLink} />
              </Link>
            </div>
          </div>

          <div className={styles.media}>
            <p>Comparte este producto con tus amigos</p>
            <div className={styles.mediaIcons}>
              <span className="icon-facebook2"></span>
              <span className="icon-twitter"></span>
              <span className="icon-whatsapp"></span>
              <span className="icon-mail2"></span>
            </div>
          </div>
        </div>
        {data && (
          <RelatedProducts category={data.category} parentId={data._id} />
        )}
      </div>
      {data && <ProductBar data={data} />}

    </>
  );
};

export default HousePage;
