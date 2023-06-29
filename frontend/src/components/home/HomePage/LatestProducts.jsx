import React, { useEffect, useState } from "react";
import styles from "../../category/AllCategories/allCategories.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllProducts } from "../../../utils/apiProducts";
import ImagesHome from "../../user/Image/ImagesHome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserData, getUserToken } from "../../../utils/localStorage.utils";
import { createFav, deleteFav, getFavs } from "../../../utils/apiFavorites";

const LatestProducts = () => {
  const { data: prods } = useQuery({
    queryKey: ["latest_products"],
    queryFn: getAllProducts,
    select: (prods) => {
      return prods.sort((a, b) => {
        const datePublicationA = new Date(a.datePublication);
        const datePublicationB = new Date(b.datePublication);
        return datePublicationB - datePublicationA;
      });
    },
  });


  console.log(prods)
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = getUserToken();
  const userData = getUserData();
  const userId = userData ? userData.id : null;
  const [showAlert, setShowAlert] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUserFavs = async () => {
      try {
        const favs = await getFavs(userId);
        if (favs && favs[0] && favs[0].products) {}
        const favsProductIds = favs && favs[0].products.map((prod) => prod._id);
        setUserFavorites(favsProductIds);
      } catch (error) {
        console.log("Error fetching user favorites", error);
      }
    };

    if (userToken) {
      fetchUserFavs();
    }
  }, [userToken]);

  // pasa las cards una a una
  const productsPerPage = 5;
  const displayedProducts =
    prods && prods.slice(currentIndex, currentIndex + productsPerPage);
  const handleNext = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === prods.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? prods.length - 1 : currentIndex - 1
    );
  };

  const handleAlertAccept = () => {
    setShowAlert(false);
  };
  const handleSessionAlert = () => {
    setSessionAlert(false);
    navigate("/user/login");
  };

  const handleFavorite = async (productId) => {
    if (!userToken) {
      setSessionAlert(true);
      setShowAlert(false);
      return;
    }
    try {
      if (userFavorites.includes(productId)) {
        await deleteFav(productId);
        setUserFavorites((prevFavorites) =>
          prevFavorites.filter((id) => id !== productId)
        );
        setShowAlert(true);
        setFavoriteStatus(false);
      } else {
        await createFav({ product: productId });
        setUserFavorites((prevFavorites) => [...prevFavorites, productId]);
        setShowAlert(true);
        setFavoriteStatus(true);
      }
    } catch (error) {
      console.log("Error toggling favorite:", error);
    }
  };

  return (
    <>
      {prods && !userToken && sessionAlert && (
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
      {prods && showAlert && (
        <div className={styles.alert}>
          {favoriteStatus
            ? "Este producto se ha añadido a tu lista de favoritos"
            : "Este producto ya no está entre tus favoritos"}
          <button onClick={handleAlertAccept} className={styles.accept}>
            Aceptar
          </button>
        </div>
      )}

      <h1 className={styles.genTitle}>Lo más reciente</h1>

      <div className={styles.homeContainer}>
        <button onClick={handlePrevious} className={styles.seeMore}>
          <span className="icon-previous"></span>
        </button>

        <div className={styles.cardsContainer}>
          {displayedProducts?.map((prod) => {
            if (!prod.sold) {
              const isFavorite = userFavorites.includes(prod._id);

              return (
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
                      {userData?.id !== prod?.user ? (
                          <button
                            onClick={() => handleFavorite(prod._id)}
                            className={`${styles.like} ${
                              isFavorite ? styles.focused : ""
                            }`}
                          >
                            <span className="icon-heart1"></span>
                          </button>
                        ) : null}
                    </div>
                    <p className={styles.title}>{prod.title}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <button onClick={handleNext} className={styles.seeMore}>
          <span className="icon-next"></span>
        </button>
      </div>
    </>
  );
};

export default LatestProducts;
