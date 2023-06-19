import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { getSoldByUser } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import styles from "./products.module.css";
import stylesDark from "./productsDark.module.css";
import { ThemeContext } from "../../../context/themeContext";
import Images from "../Image/Images";
import ImagesList from "../Image/ImagesList";

const ProductSold = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const { data: prods, isLoading } = useQuery({
    queryKey: ["PRODUCTS_SOLD"],
    queryFn: getSoldByUser,
  });
  // console.log("los productos", prods);
  const [gridOpen, setGridOpen] = useState(true);
  const toggleView = () => {
    setGridOpen(!gridOpen);
  };

  return (
    <>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      <div className={darkMode ? stylesDark.gridList : styles.gridList}>
        <button onClick={toggleView}>
          <span className="icon-table2"></span>
        </button>
        <button onClick={toggleView}>
          <span className="icon-list2"></span>
        </button>
      </div>
      <div>
        {gridOpen ? (
          <div
            className={
              darkMode ? stylesDark.gridContainer : styles.gridContainer
            }
            data-test="productos"
          >
            {prods &&
              prods.map((prod) => (
                <div
                  className={darkMode ? stylesDark.card : styles.card}
                  data-test="producto"
                  disabled
                >
                  {prods && (
                    <Images images={prod.images} status={prod.status} />
                  )}
                  <div
                    className={
                      darkMode
                        ? stylesDark.titleContainer
                        : styles.titleContainer
                    }
                  >
                    <h4 className={darkMode ? stylesDark.title : styles.title}>
                      {prod.title}
                    </h4>
                    <h4>
                      {prod.price.toLocaleString("es-ES", {
                        useGrouping: true,
                      })}
                      €
                    </h4>
                  </div>
                  <div
                    className={darkMode ? stylesDark.details : styles.details}
                  >
                    <div>
                      {prod.categories.map((category) => (
                        <h5 key={category._id}>{category.title}</h5>
                      ))}
                    </div>
                    <p>{prod.status}</p>
                  </div>
                  {Array.isArray(prod.keywords) && prod.keywords.length > 0 && (
                    <div
                      className={
                        darkMode ? stylesDark.keywords : styles.keywords
                      }
                    >
                      {prod.keywords.map((keyword, _id) => (
                        <p key={_id}>{`#${keyword}`}</p>
                      ))}
                    </div>
                  )}

                  <p
                    className={
                      darkMode ? stylesDark.paragraph : styles.paragraph
                    }
                  >
                    {prod.description}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <div
            className={
              darkMode ? stylesDark.listContainer : styles.listContainer
            }
          >
            {prods &&
              prods.map((prod) => (
                <div
                  className={darkMode ? stylesDark.list : styles.list}
                  key={prod.id}
                >
                  <div
                    className={darkMode ? stylesDark.imgList : styles.imgList}
                  >
                    {prods && <ImagesList images={prod.images} />}
                  </div>
                  <div
                    className={
                      darkMode
                        ? stylesDark.detailsContainer
                        : styles.detailsContainer
                    }
                  >
                    <div
                      className={
                        darkMode
                          ? stylesDark.titleContainer
                          : styles.titleContainer
                      }
                    >
                      <h4
                        className={
                          darkMode ? stylesDark.titleList : styles.titleList
                        }
                      >
                        {prod.title}
                      </h4>
                      <h4>
                        {prod.price.toLocaleString("es-ES", {
                          useGrouping: true,
                        })}
                        €
                      </h4>
                    </div>
                    <p
                      className={
                        darkMode ? stylesDark.paragraph : styles.paragraph
                      }
                    >
                      {prod.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
export default ProductSold;
