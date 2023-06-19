import React, { useContext } from "react";
import styles from "./editProduct.module.css";
import stylesDark from "./editProductDark.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductById, updateProduct } from "../../utils/apiProducts";
import EditImages from "../EditImages/EditImages";
import { ThemeContext } from "../../context/themeContext";

const EditJob = ({ id }) => {
  // console.log("el producto en el modal", id);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: product } = useQuery(["product-updated", id], getProductById, {
    onSuccess: (product) => {
      reset(product);
    },
  });
  // console.log("en el form de update", product);

  const queryClient = useQueryClient(["product-updated"]);
  const mutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient?.invalidateQueries(["product-updated", id]);
      window.location.reload();
      window.location.reload();
    },
  });

  const onSubmit = (product) => {
    let keywords = [];

    if (typeof product.keywords === "string") {
      keywords = product.keywords
        .split(",")
        .map((keyword) => keyword.trim().split(" "))
        .flat()
        .filter((keyword) => keyword !== "");
    } else if (Array.isArray(product.keywords)) {
      keywords = product.keywords
        .map((keyword) => keyword.trim().split(" "))
        .flat()
        .filter((keyword) => keyword !== "");
    }

    const productData = { ...product, keywords };
    mutation.mutate(productData);
    alert("Los cambios se han guardado satisfactoriamente");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={darkMode ? stylesDark.editContainer : styles.editContainer}
        >
          <div className={darkMode ? stylesDark.title : styles.title}>
            <label
              htmlFor="title"
              className={darkMode ? stylesDark.labels : styles.labels}
            >
              Título:
            </label>
            <input
              placeholder="Dale un título a tu producto"
              {...register("title", {
                required: "El título es obligatorio",
              })}
              className={darkMode ? stylesDark.input : styles.input}
            ></input>
            <label
              htmlFor="location"
              className={darkMode ? stylesDark.labels : styles.labels}
            >
              Localización:
            </label>
            <input
              placeholder="Localización"
              {...register("location")}
              className={darkMode ? stylesDark.input : styles.input}
            ></input>
          </div>

          {errors.title && (
            <p className={darkMode ? stylesDark.error : styles.error}>
              <span className="icon-warning1"></span>
              {errors.title.message}
            </p>
          )}

          <div
            className={darkMode ? stylesDark.labelTriple : styles.labelTriple}
          >
            <label
              htmlFor="price"
              className={darkMode ? stylesDark.labels : styles.labels}
            >
              Precio:
            </label>
            <label
              htmlFor="keywords"
              className={
                darkMode ? stylesDark.labelKeywords : styles.labelKeywords
              }
            >
              Tus keywords:
            </label>
            <label
              htmlFor="status"
              className={darkMode ? stylesDark.labelStatus : styles.labelStatus}
            >
              Estado de tu servicio:
            </label>
          </div>
          <div
            className={darkMode ? stylesDark.columnTriple : styles.columnTriple}
          >
            <div className={darkMode ? stylesDark.price : styles.price}>
              <input
                type="number"
                min="1"
                {...register("price", {
                  required: "El precio es obligatorio",
                })}
                placeholder="No te excedas..."
                className={
                  darkMode ? stylesDark.inputTriple : styles.inputTriple
                }
              ></input>
              <div className={darkMode ? stylesDark.coin : styles.coin}>
                EUR
              </div>
            </div>
            <input
              placeholder="Crea tus palabras clave"
              {...register("keywords")}
              className={darkMode ? stylesDark.inputTriple : styles.inputTriple}
            ></input>

            <select
              {...register("status")}
              className={darkMode ? stylesDark.dropdown : styles.dropdown}
            >
              <option value="">Selecciona un estado</option>
              <option value="Horas a convenir">Horas a convenir</option>
              <option value="Por la mañana">Por la mañana</option>
              <option value="Por la tarde">Por la tarde</option>
            </select>
          </div>

          {errors.price && (
            <p className={darkMode ? stylesDark.error : styles.error}>
              <span className="icon-warning1"></span>
              {errors.price.message}
            </p>
          )}
          <div className={darkMode ? stylesDark.double : styles.double}>
            <label
              htmlFor="description"
              className={darkMode ? stylesDark.labels : styles.labels}
            >
              Descripción:
            </label>
            <textarea
              maxLength={500}
              placeholder="Describe las ventajas del servicio o empleo que buscas para que los demás sepan por qué deben contratarte a ti y no a otro..."
              {...register("description", {
                required: "La descripción es obligatoria",
              })}
              className={darkMode ? stylesDark.textArea : styles.textArea}
            ></textarea>
          </div>
          {errors.description && (
            <p className={darkMode ? stylesDark.error : styles.error}>
              <span className="icon-warning1"></span>
              {errors.description.message}
            </p>
          )}

          {product && <EditImages product={product} />}

          <div className={darkMode ? stylesDark.formButton : styles.formButton}>
            <button type="submit" data-test="guardar">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditJob;
