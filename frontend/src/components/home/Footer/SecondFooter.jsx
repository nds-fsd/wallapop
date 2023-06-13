import React from "react";
import { getCategories } from "../../../utils/apiCategories";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import styles from "./footer.module.css";

const SecondFooter = () => {
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
                  target="_blank"
                >
                  {cat.title}
                </Link>
              ))}
            </h4>

            <div className={styles.foot}>
              <div className={styles.columnLeft}>
                <div className={styles.secondQuestions}>
                <h4>Aviso legal</h4>
                <h4>Condiciones de uso</h4>
                <h4>Política de privacidad</h4>
                <h4>Cookies</h4>
              </div>
              <div className={styles.mediaIcons2}>
                <h3>Síguenos</h3>
                <span className="icon-facebook2"></span>
                <span className="icon-twitter"></span>
                <span className="icon-instagram"></span>
              </div>
</div>
              <div className={styles.preguntas}>
                <h3>¿Tienes alguna pregunta?</h3>
                <div className={styles.message}>
                <p>Contacta con nuestro equipo de profesionales, estaremos encantados de ayudarte.</p>
                <span className="icon-mail2"></span>
                </div>
              </div>

              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SecondFooter;
