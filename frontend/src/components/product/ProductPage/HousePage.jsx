import React, { useState } from "react";
import styles from "./productPage.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Slider from "../Slider/Slider";
import Keywords from "../Keywords/Keywords";
import ProductBar from "../ProductBar/ProductBar";
import {
  changeFavorite,
  getProductById,
  updateProduct,
} from "../../../utils/apiProducts";
import { Link, useNavigate } from "react-router-dom";
import { getUserToken } from "../../../utils/localStorage.utils";

const HousePage = ({ id }) => {
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
      console.log(userToken)
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

  //Cuando todos los productos tengan asociado categories (title, logo...)
  //junto con el div que tiene el Link
  // const title = data?.categories[0].title
  // console.log("el titulo de la categoria", title)

  return (
    <>
      {data && sessionAlert && (
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
          {data.favorite
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
                className={`${styles.like} ${favorite ? styles.focused : ""}`}
              >
                <span className="icon-heart1"></span>
              </button>
              <button className={styles.chat}>CHAT</button>
            </div>
          </div>
          {data && <Slider images={mockImages} data={data} />}

          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <h1 className={styles.price}>
                {data &&
                  data.price.toLocaleString("es-ES", { useGrouping: true })}
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
          {data.space || data.rent || data.land ? (
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
                <img src="C:\Users\anank\Documents\Ananke85\wallapop\frontend\src\assets\carfax.png"></img>
              </Link>
            </div>

            <div className={styles.links}>
              <span className="icon-coin-euro"></span>
              <h5>Calcula tu seguro</h5>
              <Link to="https://www.mapfre.es/particulares/" target="_blank">
                <img src="C:\Users\anank\Documents\Ananke85\wallapop\frontend\src\assets\carfax.png"></img>
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
          {data && <ProductBar data={data} />}
        </div>
      </div>
    </>
  );
};

export default HousePage;
