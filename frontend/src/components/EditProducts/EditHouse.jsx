import React, { useEffect, useContext } from "react";
import styles from "./editProduct.module.css";
import stylesDark from "./editProductDark.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductById, updateProduct } from "../../utils/apiProducts";
import EditImages from "../EditImages/EditImages";
import { ThemeContext } from "../../context/themeContext";

const EditHouse = ({ id }) => {
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

  const queryClient = useQueryClient(["product-updated"]);
  const mutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient?.invalidateQueries(["product-updated", id]);
      window.location.reload();
      window.location.reload();
    },
  });

  // const onSubmit = (product) => {
  //   let keywords = product.keywords
  //     ?.split(",")
  //     .map((keyword) => keyword.trim())
  //     .filter((keyword) => keyword !== "");

  //   const productData = { ...product, keywords};
  //   mutation.mutate(productData);
  //   alert("Los cambios se han guardado satisfactoriamente")
  // };

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

          <div className={darkMode ? stylesDark.title : styles.title}>
            <label
              htmlFor="rent"
              className={darkMode ? stylesDark.labels : styles.labels}
            >
              Renta:
            </label>
            <select
              {...register("rent", { required: "Este campo es obligatorio" })}
              className={darkMode ? stylesDark.input : styles.input}
            >
              <option value="">Selecciona una opción</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>

            <label
              htmlFor="space"
              className={darkMode ? stylesDark.labels : styles.labels}
            >
              Espacio:
            </label>
            <select
              {...register("space", { required: "Este campo es obligatorio" })}
              className={darkMode ? stylesDark.input : styles.input}
            >
              <option value="">Selecciona una opción</option>
              <option value="Piso">Piso</option>
              <option value="Casa">Casa</option>
              <option value="Habitación">Habitación</option>
              <option value="Oficina">Oficina</option>
              <option value="Garaje">Garaje</option>
              <option value="Trastero">Trastero</option>
            </select>
            <label
              htmlFor="land"
              className={darkMode ? stylesDark.labels : styles.labels}
            >
              Superficie:
            </label>
            <input
              type="number"
              min="1"
              {...register("land", { required: "Este campo es obligatorio" })}
              placeholder="En m2"
              className={darkMode ? stylesDark.input : styles.input}
            ></input>
          </div>
          <div className={darkMode ? stylesDark.error2 : styles.error2}>
            {errors.rent && (
              <p className={darkMode ? stylesDark.error : styles.error}>
                <span className="icon-warning1"></span>
                {errors.rent.message}
              </p>
            )}
            {errors.space && (
              <p className={darkMode ? stylesDark.error : styles.error}>
                <span className="icon-warning1"></span>
                {errors.space.message}
              </p>
            )}
            {errors.land && (
              <p className={darkMode ? stylesDark.error : styles.error}>
                <span className="icon-warning1"></span>
                {errors.land.message}
              </p>
            )}
          </div>

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
              Estado de tu inmueble:
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
              // defaultValue={product?.keywords?.join(", ") || ""}
            ></input>

            <select
              {...register("status")}
              className={darkMode ? stylesDark.dropdown : styles.dropdown}
            >
              <option value="">Selecciona un estado</option>
              <option value="Obra nueva">Obra nueva</option>
              <option value="En buen estado">En buen estado</option>
              <option value="A reformar">A reformar</option>
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
            <button data-test="guardar" type="submit">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditHouse;
