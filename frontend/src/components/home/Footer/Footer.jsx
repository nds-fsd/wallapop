import React from "react";
import { getCategories } from "../../../utils/apiCategories";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import styles from "./footer.module.css";
import logo_dark from "../../../assets/images/logo-retrend-dark.png";

const Footer = () => {
  const { data: categories, isLoading } = useQuery(["category"], getCategories);

  return (
    <>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <div>
        {!isLoading && (
          <div className={styles.container}>
            <h2 className={styles.titles}>Categorías</h2>
            <h4 className={styles.categories}>
              {categories.map((cat) => (
                <Link
                  to={"/category/" + cat.title}
                  key={cat._id}
                  // target="_blank"
                >
                  {cat.title}
                </Link>
              ))}
            </h4>
            <h5 className={styles.slogan}>
              {" "}
              Todo lo que buscas a un click de distancia
            </h5>
            <div className={styles.retrend}>
              <div className={styles.logo}>
                <img src={logo_dark} />
                <p>
                  Copyright © 2023 ReTrend © de sus respectivos propietarios
                </p>
              </div>

              <div>
                <h2 className={styles.titles}>ReTrend y la segunda mano</h2>
                <p>
                  “Dale una segunda vida a lo que ya no usas”. Bajo esta
                  premisa, ReTrend se ha convertido en una comunidad en la que
                  cada día millones de personas compran y venden productos de
                  segunda mano. Y no hemos hecho más que empezar. Comprar
                  segunda mano es la mejor forma de conseguir lo que necesitas a
                  un precio mejor. ¡Pero va mucho más allá! Cada vez que compras
                  algo en ReTrend, fomentas un consumo más responsable, porque
                  alargas la vida de los productos y evitas su sobreproducción.
                  Vender segunda mano es decirle al mundo que podemos vivir más
                  con menos. Más espacio en casa, más dinero extra, más nuevas
                  experiencias, más recuerdos inolvidables, más lo que quieras,
                  y menos cosas sin usar guardadas en el armario. Por fin, la
                  sociedad ha comprendido que la segunda mano es una nueva forma
                  de consumir llena de beneficios. Esta es la razón por la que
                  cada vez más personas usan ReTrend.
                </p>
              </div>
            </div>

            <div className={styles.questions}>
              <div>
                <h2 className={styles.titles}>ReTrend</h2>
                <h4>Quiénes somos</h4>
                <h4>Cómo funciona</h4>
              </div>
              <div>
                <h2 className={styles.titles}>Soporte</h2>
                <h4>Centro de ayuda</h4>
                <h4>Reglas de publicación</h4>
                <h4>Consejos de seguridad</h4>
              </div>
              <div>
                <h2 className={styles.titles}>Legal</h2>
                <h4>Aviso legal</h4>
                <h4>Política de privacidad</h4>
                <h4>Cookies</h4>
              </div>
              <div>
                <h2 className={styles.titles}>Motor</h2>
                <h4>Particulares</h4>
                <h4>Profesionales</h4>
              </div>
              <div>
                <h2 className={styles.titles}>ReTrend PRO</h2>
                <h4>Impulsa tu negocio</h4>
              </div>
            </div>
            <div className={styles.mediaIcons}>
              <h3>Síguenos</h3>
              <span className="icon-facebook2"></span>
              <span className="icon-twitter"></span>
              <span className="icon-instagram"></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Footer;
