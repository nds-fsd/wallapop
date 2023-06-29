import React, { useEffect, useContext, useState } from "react";
import styles from "./productPage.module.css";
import { useQuery } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import { getProductById, updateProduct } from "../../../utils/apiProducts";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { getUserData, getUserToken } from "../../../utils/localStorage.utils";
import RelatedProducts from "./RelatedProducts";
import { createFav, deleteFav, getFavs } from "../../../utils/apiFavorites";
import creditea from "../../../assets/images/creditea.png";
import carfax from "../../../assets/images/carfax.png";
import mapfre from "../../../assets/images/mapfre.png";
import { postChatRoom } from "../../../utils/apiChatRoom";
import { AuthContext } from "../../../context/authContext";

const VehiclePage = ({ id }) => {
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
        if (favs && favs[0] && favs[0].products) {
          const favsProductIds =
            favs && favs[0].products.map((prod) => prod._id);
          const isProductFavorite = favsProductIds.includes(String(id));
          setUserFavorites(isProductFavorite);
        } else {
          setUserFavorites(false);
        }
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
    if (!userToken) {
      setSessionAlert(true);
      setShowAlert(false);
      return;
    }
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
              <h3>{data && data?.user?.name}</h3>
              <div className={styles.background}>
              <img src={data?.user?.photo === "" ? "https://res.cloudinary.com/dvogntdp2/image/upload/v1687880800/s9jq5uchu8mcvbftlqfj.jpg" : data.user.photo} className={styles.userPhoto} />
              </div>
            </div>
            <div className={styles.buttons}>
              {userData?.id !== data?.user._id ? (<button
                onClick={handleFavorite}
                className={`${styles.like} ${
                  userFavorites ? styles.focused : ""
                }`}
              >
                <span
                    className={`icon-heart1 ${
                     userToken && userFavorites ? styles.focused : ""
                    }`}
                  ></span>
              </button>) : ("")}
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
                  data.price?.toLocaleString("es-ES", {
                    useGrouping: true,
                  })}{" "}
              </h1>
              <h2>EUR</h2>
            </div>
            <div className={styles.category}>
              <Link to={"/category/" + title}>
                {data && data.categories &&
                  category.map((cat) => (
                    <span className={cat.logo} key={cat._id} />
                  ))}
                <h3>{data && data.category}</h3>
              </Link>
            </div>
          </div>

          <h2>{data && data.title}</h2>
          {data && <Keywords data={data} />}

          {data?.brand || data?.model || data?.year || data?.doors || data?.seats ? (
            <div className={styles.detailType}>
              {data?.brand && <p className={styles.detail}>{data.brand}</p>}
              {data?.model && <p className={styles.detail}>{data.model}</p>}
              {data?.year && <p className={styles.detail}>{data.year}</p>}
              {data?.doors !== 0 &&  data?.doors && (
                <p className={styles.detail}>{data.doors} puertas</p>
              )}
              {data?.seats !== 0 && data?.seats && (
                <p className={styles.detail}>{data.seats} plaza{data.seats !==1 ? "s" : ""}</p>
              )}
            </div>
          ) : null}
          {data?.km || data?.engine || data?.shift ? (
            <div className={styles.detailType2}>
              {data?.km && (
                <p className={styles.detail}>
                  {data?.km.toLocaleString("es-ES", { useGrouping: true })} Km
                </p>
              )}
              {data?.engine && <p className={styles.detail}>{data.engine}</p>}
              {data?.shift && <p className={styles.detail}>{data.shift}</p>}
            </div>
          ) : null}

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
          <div className={styles.linksContainer}>
            <div className={styles.links}>
              <span className="icon-credit-card1"></span>
              <h5>Calcula tu préstamo</h5>
              <Link to="https://www.creditea.es/" target="_blank">
                <img src={creditea} className={styles.imgLink} />
              </Link>
            </div>
            <div className={styles.links}>
              <span className="icon-file-text2"></span>
              <h5>Historial del vehículo</h5>
              <Link to="https://shorturl.at/qxG89" target="_blank">
                <img src={carfax} className={styles.imgLink} />
              </Link>
            </div>
            <div className={styles.links}>
              <span className="icon-coin-euro"></span>
              <h5>Calcula tu seguro</h5>
              <Link to="https://www.mapfre.es/particulares/" target="_blank">
                <img src={mapfre} className={styles.imgLink} />
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
          <RelatedProducts category={data?.category} parentId={data?._id} />
        )}
      </div>
      {data && userToken && userData?.id !== data?.user._id ? (<ProductBar data={data}/>) : ("")}

    </>
  );
};

export default VehiclePage;
