import React, { useEffect, useState, useContext } from "react";
import styles from "./productPage.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import { postChatRoom } from "../../../utils/apiChatRoom";
import { AuthContext } from "../../../context/authContext";
import { getProductById, updateProduct } from "../../../utils/apiProducts";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { changeFavorite } from "../../../utils/apiFavorites";

const ElsePage = ({ id }) => {
  const { userData } = useContext(AuthContext);

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

  const handleFavorite = async () => {
    const userToken = localStorage.getItem("user-session");

    if (userToken) {
      const updatedFavorite = !isFavorite;
      setIsFavorite(updatedFavorite);
      const favoriteData = {
        user: userId,
        favorite: updatedFavorite,
        product: data._id,
        // ...data
      };

      try {
        await mutation.mutateAsync(favoriteData);

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

  const handleCreateChatRoom = async () => {
    const body = {
      product_id: data._id,
      owner_id: data.user._id,
      buyer_id: userData._id,
    };

    try {
      const chatroom = await postChatRoom(body);
      navigate(`/user/messages/chatroom/${chatroom._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data && !userId && sessionAlert && (
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
      {data && isFavorite && showAlert && (
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
              {userData?._id !== data?.user._id ? (
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
                  data.price?.toLocaleString("es-ES", { useGrouping: true })}
              </h1>
              <h2>EUR</h2>
            </div>
            {/* <div className={styles.category}>
            <Link to={"/category/" + title} key={category._id}>
              {data.categories &&
                category.map((cat) => <span className={cat.logo} />)}
              <h3>{data && data.category}</h3>
            </Link>
          </div> */}
            <div className={styles.category}>
              {category && category.map((cat) => <span className={cat.logo} />)}
              <h3>{data && data.category}</h3>
            </div>
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
      </div>
    </>
  );
};
export default ElsePage;
