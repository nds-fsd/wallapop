import React, { useContext, useState } from "react";
import styles from "./createProductPage.module.css";
import stylesDark from "./createProductPageDark.module.css";
import { useForm } from "react-hook-form";
import { postProduct } from "../../../utils/apiProducts";
import { useMutation, useQueryClient } from "react-query";
import FormImages from "../FormImages/FormImages";
import { AuthContext } from "../../../context/authContext";
import { ThemeContext } from "../../../context/themeContext";

const FormJob = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const queryClient = useQueryClient(["product"]);
  const { images, setImages } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
    },
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageUpload = (files, index) => {
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews[index] = imageUrls[0];
      return updatedPreviews;
    });
  };

  const onSubmit = (data) => {
    const keywords = data.keywords
      ?.split(/[, ]+/)
      .filter((keyword) => keyword !== "");

    const productData = { ...data, images };
    if (keywords && keywords.length > 0) {
      productData.keywords = keywords;
    }

    mutation.mutate(productData);
    // console.log(productData);
    // setShowAlert(true);
    alert("Tu producto se ha subido correctamente");
    reset();
    setImages([]);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={darkMode ? stylesDark.sectionForm : styles.sectionForm}
      >
        <div className={darkMode ? stylesDark.title : styles.title}>
          <h2>Información del servicio / empleo</h2>
          <div className={darkMode ? stylesDark.line : styles.line}></div>
        </div>
        <label
          htmlFor="title"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Qué ofreces?
        </label>
        <input
          placeholder="Dale un título a tu servicio / empleo"
          {...register("title", {
            required: "El título es obligatorio",
          })}
          className={darkMode ? stylesDark.input : styles.input}
        ></input>
        {errors.title && (
          <p className={darkMode ? stylesDark.error : styles.error}>
            <span className="icon-warning1"></span>
            {errors.title.message}
          </p>
        )}
        <div className={darkMode ? stylesDark.labelDouble : styles.labelDouble}>
          <label
            htmlFor="price"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Ponle precio
          </label>
          <label
            htmlFor="keywords"
            className={
              darkMode ? stylesDark.labelKeywords : styles.labelKeywords
            }
          >
            Keywords
          </label>
        </div>
        <div className={darkMode ? stylesDark.price : styles.price}>
          <input
            type="number"
            min="1"
            {...register("price", { required: "El precio es obligatorio" })}
            placeholder="No te excedas..."
            className={darkMode ? stylesDark.inputPrice : styles.inputPrice}
          ></input>
          <div className={darkMode ? stylesDark.coin : styles.coin}>EUR</div>
          <input
            placeholder="Crea tus palabras clave"
            {...register("keywords")}
            className={
              darkMode ? stylesDark.inputKeywords : styles.inputKeywords
            }
          ></input>
        </div>
        {errors.price && (
          <p className={darkMode ? stylesDark.error : styles.error}>
            <span className="icon-warning1"></span>
            {errors.price.message}
          </p>
        )}
        <div className={darkMode ? stylesDark.labelDouble : styles.labelDouble}>
          <label
            htmlFor="category"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            {" "}
            Categoría
          </label>
          <label
            htmlFor="status"
            className={darkMode ? stylesDark.labelStatus : styles.labelStatus}
          >
            Estado de tu servicio
          </label>
        </div>
        <div className={darkMode ? stylesDark.column : styles.column}>
          <select
            {...register("category", { required: "Selecciona una categoría" })}
            className={darkMode ? stylesDark.dropdown : styles.dropdown}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Servicios">Servicios</option>
            <option value="Empleo">Empleo</option>
          </select>
          <select
            {...register("status", { required: "Selecciona un estado" })}
            className={darkMode ? stylesDark.dropdown : styles.dropdown}
          >
            <option value="">Selecciona un estado</option>
            <option value="Horas a convenir">Horas a convenir</option>
            <option value="Por la mañana">Por la mañana</option>
            <option value="Por la tarde">Por la tarde</option>
          </select>
        </div>
        <div className={darkMode ? stylesDark.status : styles.status}>
          {errors.category && (
            <p className={darkMode ? stylesDark.error : styles.error}>
              <span className="icon-warning1"></span>
              {errors.category.message}
            </p>
          )}
          {errors.status && (
            <p className={darkMode ? stylesDark.error : styles.error}>
              <span className="icon-warning1"></span>
              {errors.status.message}
            </p>
          )}
        </div>

        <label
          htmlFor="description"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Cómo es tu servicio?
        </label>
        <textarea
          maxLength={500}
          placeholder="Describe las ventajas del servicio o empleo que buscas para que los demás sepan por qué deben contratarte a ti y no a otro..."
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
          className={darkMode ? stylesDark.textArea : styles.textArea}
        ></textarea>
        {errors.description && (
          <p className={darkMode ? stylesDark.error : styles.error}>
            <span className="icon-warning1"></span>
            {errors.description.message}
          </p>
        )}
        <FormImages
          handleImageUpload={handleImageUpload}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
          reset={reset}
        />
        {/* <Map /> */}
        <button
          type="submit"
          className={darkMode ? stylesDark.formButton : styles.formButton}
        >
          Subir
        </button>
        {/* {showAlert && <CustomAlert message="Tu producto se ha subido correctamente" onClose={handleCloseAlert} />} */}
      </form>
    </>
  );
};

export default FormJob;
