import React, { useContext, useState } from "react";
import styles from "./createProductPage.module.css";
import stylesDark from "./createProductPageDark.module.css";
import { Controller, useForm } from "react-hook-form";
import { postProduct } from "../../../utils/apiProducts";
import { useMutation, useQueryClient } from "react-query";
import FormImages from "../FormImages/FormImages";
import { AuthContext } from "../../../context/authContext";
import { ThemeContext } from "../../../context/themeContext";

const FormHouse = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const queryClient = useQueryClient(["product"]);
  const { images, setImages } = useContext(AuthContext);
  const {
    control,
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
    console.log(productData);
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
          <h2>Información de tu inmueble</h2>
          <div className={darkMode ? stylesDark.line : styles.line}></div>
        </div>
        <div className={darkMode ? stylesDark.inmuebles : styles.inmuebles}>
          {/* Este input controlorá que la categoría esté checkeada por defecto sin ser vista en pantalla */}
          <Controller
            name="category"
            control={control}
            defaultValue="Inmobiliaria"
            render={({ field }) => (
              <div>
                <label htmlFor="category"></label>
                <input
                  id="Inmobiliaria"
                  type="checkbox"
                  {...field}
                  value="Inmobiliaria"
                  name="category"
                ></input>
              </div>
            )}
          />
        </div>
        <label
          htmlFor="Alquiler"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Alquilas o vendes?
        </label>
        <Controller
          name="rent"
          control={control}
          defaultValue={false}
          rules={{ required: "Selecciona una opción" }}
          render={({ field }) => (
            <div className={darkMode ? stylesDark.category : styles.category}>
              <label
                htmlFor="Alquiler"
                className={darkMode ? stylesDark.checkbox : styles.checkbox}
              >
                <input
                  id="Alquiler"
                  type="radio"
                  {...field}
                  value="Alquiler"
                  name="rent"
                ></input>
                <span className="icon-alquiler"></span>
              </label>

              <label
                htmlFor="Venta"
                className={darkMode ? stylesDark.checkbox : styles.checkbox}
              >
                <input
                  id="Venta"
                  type="radio"
                  {...field}
                  value="Venta"
                  name="rent"
                ></input>
                <span className="icon-venta"></span>
              </label>
            </div>
          )}
        />
        {errors.rent && (
          <p className={darkMode ? stylesDark.error1 : styles.error1}>
            <span className="icon-warning1"></span>
            {errors.rent.message}
          </p>
        )}
        <label
          htmlFor="title"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Qué ofreces?
        </label>
        <input
          placeholder="Dale un título a tu inmueble"
          {...register("title", { required: "El título es obligatorio" })}
          className={darkMode ? stylesDark.input : styles.input}
        ></input>
        {errors.title && (
          <p className={darkMode ? stylesDark.error : styles.error}>
            <span className="icon-warning1"></span>
            {errors.title.message}
          </p>
        )}
        <label
          htmlFor="space"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿De qué espacio se trata?
        </label>
        <div>
          <Controller
            name="space"
            control={control}
            defaultValue={false}
            rules={{ required: "Selecciona una opción" }}
            render={({ field }) => (
              <div className={darkMode ? stylesDark.type : styles.type}>
                <label
                  htmlFor="Piso"
                  className={darkMode ? stylesDark.square : styles.square}
                >
                  <input
                    id="Piso"
                    type="radio"
                    {...field}
                    value="Piso"
                    name="space"
                  ></input>
                  <span className="icon-piso"></span>
                  Piso
                </label>
                <label
                  htmlFor="Casa"
                  className={darkMode ? stylesDark.square : styles.square}
                >
                  <input
                    id="Casa"
                    type="radio"
                    {...field}
                    value="Casa"
                    name="space"
                  ></input>
                  <span className="icon-casa"></span>
                  Casa
                </label>
                <label
                  htmlFor="Habitación"
                  className={darkMode ? stylesDark.square : styles.square}
                >
                  <input
                    id="Habitación"
                    type="radio"
                    {...field}
                    value="Habitación"
                    name="space"
                  ></input>
                  <span className="icon-habitacion"></span>
                  Habitación
                </label>
                <label
                  htmlFor="Oficina"
                  className={darkMode ? stylesDark.square : styles.square}
                >
                  <input
                    id="Oficina"
                    type="radio"
                    {...field}
                    value="Oficina"
                    name="space"
                  ></input>
                  <span className="icon-oficina"></span>
                  Oficina
                </label>
                <label
                  htmlFor="Garaje"
                  className={darkMode ? stylesDark.square : styles.square}
                >
                  <input
                    id="Garaje"
                    type="radio"
                    {...field}
                    value="Garaje"
                    name="space"
                  ></input>
                  <span className="icon-garaje"></span>
                  Garaje
                </label>
                <label
                  htmlFor="Trastero"
                  className={darkMode ? stylesDark.square : styles.square}
                >
                  <input
                    id="Trastero"
                    type="radio"
                    {...field}
                    value="Trastero"
                    name="space"
                  ></input>
                  <span className="icon-trastero"></span>
                  Trastero
                </label>
              </div>
            )}
          />
        </div>
        {errors.space && (
          <p className={darkMode ? stylesDark.error : styles.error}>
            <span className="icon-warning1"></span>
            {errors.space.message}
          </p>
        )}
        <div className={darkMode ? stylesDark.labelDouble : styles.labelDouble}>
          <label
            htmlFor="land"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Superficie
          </label>
          <label
            htmlFor="status"
            className={darkMode ? stylesDark.labelStatus : styles.labelStatus}
          >
            Estado de tu inmueble
          </label>
        </div>
        <div className={darkMode ? stylesDark.column : styles.column}>
          <input
            type="number"
            min="1"
            {...register("land", { required: "Este campo es obligatorio" })}
            placeholder="En m2"
            className={darkMode ? stylesDark.inputLand : styles.inputLand}
          ></input>
          <select
            {...register("status", { required: "Selecciona un estado" })}
            className={darkMode ? stylesDark.dropdown : styles.dropdown}
          >
            <option value="">Selecciona un estado</option>
            <option value="Obra nueva">Obra nueva</option>
            <option value="En buen estado">En buen estado</option>
            <option value="A reformar">A reformar</option>
          </select>
        </div>
        <div className={darkMode ? stylesDark.status : styles.status}>
          {errors.land && (
            <p className={darkMode ? stylesDark.error : styles.error}>
              <span className="icon-warning1"></span>
              {errors.land.message}
            </p>
          )}
          {errors.status && (
            <p className={darkMode ? stylesDark.error : styles.error}>
              <span className="icon-warning1"></span>
              {errors.status.message}
            </p>
          )}
        </div>
        <div>
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
        <label
          htmlFor="description"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Cómo es tu inmueble?
        </label>
        <textarea
          maxLength={500}
          placeholder="Describe los detalles más llamativos de tu espacio..."
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
        {/* {showAlert && <CustomAlert message="Tu producto se ha subido correctamente" onClose={handleCloseAlert}/>} */}
      </form>
    </>
  );
};

export default FormHouse;
