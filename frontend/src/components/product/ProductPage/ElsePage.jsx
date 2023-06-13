import React, { useEffect, useRef, useState } from "react";
import styles from "./productPage.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import {  getProductById } from "../../../utils/apiProducts";
import { Link, useNavigate } from "react-router-dom";
import { changeFavorite } from "../../../utils/apiFavorites";
import RelatedProducts from "./RelatedProducts";

const ElsePage = ({ id }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const { data, isLoading } = useQuery(["product", id], getProductById);
  const category = data?.categories;

  // console.log(data);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(changeFavorite, {
    onSuccess: (updatedFavorite) => {
      if (updatedFavorite !== undefined) {
        setIsFavorite(updatedFavorite);
        queryClient.setQueryData(["product", id], { ...data, favorite: updatedFavorite});
        setShowAlert(true);
      } else {
        setSessionAlert(true);
        setShowAlert(true);
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
    // console.log("el id del user", userId)


  const handleFavorite = async () => {
    const userToken = localStorage.getItem("user-session");
       
    if (userToken) {

      const updatedFavorite = !isFavorite;
      setIsFavorite(updatedFavorite);
      const favoriteData = {
        products: data._id,
        favorite: updatedFavorite,
        user: userId,  
      }
      console.log("favorite data", updatedFavorite)

      try {
        await mutation.mutateAsync(favoriteData);
        console.log("el producto cambiado", favoriteData);

        setSessionAlert(false);
        setShowAlert(true);
      } catch (error) {
        console.log("error actualizando", error)
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
  const title = data?.categories[0].title
  // console.log("el titulo de la categoria", title)

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
      <div className={styles.productPage} >
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
              <Link to={"/category/" + title} >
                {data.categories &&
                  category.map((cat) => <span className={cat.logo} key={cat._id} />)}
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
        {data && <RelatedProducts category={data.category} parentId={data._id} />}

      </div>
    </>
  );
};

export default ElsePage;
