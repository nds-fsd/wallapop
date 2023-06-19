import React, { useContext, useState } from "react";
import styles from "./createProductPage.module.css";
import stylesDark from "./createProductPageDark.module.css";
import { Controller, useForm } from "react-hook-form";
import { postProduct } from "../../../utils/apiProducts";
import { useMutation, useQueryClient } from "react-query";
import FormImages from "../FormImages/FormImages";
import { AuthContext } from "../../../context/authContext";
import { ThemeContext } from "../../../context/themeContext";

const FormVehicle = () => {
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
      queryClient?.invalidateQueries(["product"]);
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

  // console.log(errors)

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={darkMode ? stylesDark.sectionForm : styles.sectionForm}
      >
        <div className={darkMode ? stylesDark.title : styles.title}>
          <h2>Información básica</h2>
          <div className={darkMode ? stylesDark.line : styles.line}></div>
        </div>
        <label
          htmlFor="title"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Qué vas a vender hoy?
        </label>

        <div className={darkMode ? stylesDark.category : styles.category}>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Selecciona una categoría" }}
            render={({ field }) => (
              <div className={darkMode ? stylesDark.category : styles.category}>
                <label
                  htmlFor="Coches"
                  className={darkMode ? stylesDark.checkbox : styles.checkbox}
                >
                  <input
                    id="Coches"
                    type="radio"
                    {...field}
                    value="Coches"
                    name="category"
                    onChange={field.onChange}
                  ></input>
                  <span className="icon-coches"></span>
                </label>

                <label
                  htmlFor="Motos"
                  className={darkMode ? stylesDark.checkbox : styles.checkbox}
                >
                  <input
                    id="Motos"
                    type="radio"
                    {...field}
                    value="Motos"
                    name="category"
                    onChange={field.onChange}
                  ></input>
                  <span className="icon-motos"></span>
                </label>
              </div>
            )}
          />
        </div>
        {errors.category && (
          <p className={darkMode ? stylesDark.error1 : styles.error1}>
            <span className="icon-warning1"></span>
            {errors.category.message}
          </p>
        )}

        <label
          htmlFor="title"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Qué ofreces?
        </label>
        <input
          placeholder="Dale un título a tu vehículo"
          {...register("title", { required: "El título es obligatorio" })}
          className={darkMode ? stylesDark.input : styles.input}
        ></input>
        {errors.title && (
          <p className={darkMode ? stylesDark.error : styles.error}>
            <span className="icon-warning1"></span>
            {errors.title.message}
          </p>
        )}
        <div className={darkMode ? stylesDark.labelTriple : styles.labelTriple}>
          <label
            htmlFor="brand"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Marca
          </label>
          <label
            htmlFor="model"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Modelo
          </label>
          <label
            htmlFor="year"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Año
          </label>
        </div>
        <div className={darkMode ? stylesDark.vehicle : styles.vehicle}>
          <input
            placeholder="Ej. BMW"
            {...register("brand", { required: "Este campo es obligatorio" })}
            className={darkMode ? stylesDark.inputVehicle : styles.inputVehicle}
          ></input>
          <input
            placeholder="Ej. S1"
            {...register("model", { required: "Este campo es obligatorio" })}
            className={darkMode ? stylesDark.inputVehicle : styles.inputVehicle}
          ></input>
          <input
            placeholder="De fabricación"
            {...register("year", { required: "Este campo es obligatorio" })}
            className={darkMode ? stylesDark.inputVehicle : styles.inputVehicle}
          ></input>
        </div>
        <div className={darkMode ? stylesDark.error2 : styles.error2}>
          {errors.brand && (
            <p>
              <span className="icon-warning1"></span>
              {errors.brand.message}
            </p>
          )}
          {errors.model && (
            <p>
              <span className="icon-warning1"></span>
              {errors.model.message}
            </p>
          )}
          {errors.year && (
            <p>
              <span className="icon-warning1"></span>
              {errors.year.message}
            </p>
          )}
        </div>

        <div className={darkMode ? stylesDark.title : styles.title}>
          <h2>Información del vehículo</h2>
          <div className={darkMode ? stylesDark.line : styles.line}></div>
        </div>
        <div
          className={darkMode ? stylesDark.labelTriple2 : styles.labelTriple2}
        >
          <label
            htmlFor="doors"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Puertas
          </label>
          <label
            htmlFor="seats"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Plazas
          </label>
          <label
            htmlFor="km"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Kilometraje
          </label>
        </div>
        <div className={darkMode ? stylesDark.vehicle : styles.vehicle}>
          <input
            type="number"
            placeholder="Escribe un número"
            {...register("doors")}
            className={darkMode ? stylesDark.inputVehicle : styles.inputVehicle}
          ></input>
          <input
            type="number"
            placeholder="Escribe un número"
            {...register("seats")}
            className={darkMode ? stylesDark.inputVehicle : styles.inputVehicle}
          ></input>
          <input
            type="number"
            placeholder="Sé preciso"
            {...register("km", { required: "Este campo es obligatorio" })}
            className={darkMode ? stylesDark.inputVehicle : styles.inputVehicle}
          ></input>
        </div>
        {errors.km && (
          <p className={darkMode ? stylesDark.error3 : styles.error3}>
            <span className="icon-warning1"></span>
            {errors.km.message}
          </p>
        )}
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
          htmlFor="status"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          Estado de tu vehículo
        </label>
        <div>
          <select
            {...register("status", { required: "Selecciona un estado" })}
            className={darkMode ? stylesDark.dropdown : styles.dropdown}
          >
            <option value="">Selecciona un estado</option>
            <option value="En buen estado">En buen estado</option>
            <option value="Poco uso">Poco uso</option>
          </select>
        </div>
        {errors.status && (
          <p className={darkMode ? stylesDark.error : styles.error}>
            <span className="icon-warning1"></span>
            {errors.status.message}
          </p>
        )}

        <div>
          <label
            htmlFor="engine"
            className={darkMode ? stylesDark.labels : styles.labels}
          >
            Motor
          </label>
          <label
            htmlFor="shift"
            className={darkMode ? stylesDark.labelShift : styles.labelShift}
          >
            Cambio
          </label>
        </div>
        <div>
          <div className={darkMode ? stylesDark.motor : styles.motor}>
            <Controller
              name="engine"
              control={control}
              defaultValue={false}
              rules={{ required: "Selecciona una opción" }}
              render={({ field }) => (
                <div className={darkMode ? stylesDark.engine : styles.engine}>
                  <label
                    htmlFor="Gasolina"
                    className={darkMode ? stylesDark.square : styles.square}
                  >
                    <input
                      id="Gasolina"
                      type="radio"
                      {...field}
                      value="Gasolina"
                      name="engine"
                    ></input>
                    <span className="icon-gasolina"></span>
                    Gasolina
                  </label>
                  <label
                    htmlFor="Diesel"
                    className={darkMode ? stylesDark.square : styles.square}
                  >
                    <input
                      id="Diesel"
                      type="radio"
                      {...field}
                      value="Diesel"
                      name="engine"
                    ></input>
                    <span className="icon-diesel"></span>
                    Diesel
                  </label>
                  <label
                    htmlFor="Eléctrico"
                    className={darkMode ? stylesDark.square : styles.square}
                  >
                    <input
                      id="Eléctrico"
                      type="radio"
                      {...field}
                      value="Eléctrico"
                      name="engine"
                    ></input>
                    <span className="icon-electrico"></span>
                    Eléctrico
                  </label>
                </div>
              )}
            />
            <Controller
              name="shift"
              control={control}
              defaultValue={false}
              rules={{ required: "Selecciona una opción" }}
              render={({ field }) => (
                <div className={darkMode ? stylesDark.engine : styles.engine}>
                  <label
                    htmlFor="Manual"
                    className={darkMode ? stylesDark.square : styles.square}
                  >
                    <input
                      id="Manual"
                      type="radio"
                      {...field}
                      value="Manual"
                      name="shift"
                    ></input>
                    <span className="icon-cambio-manual"></span>
                    Manual
                  </label>
                  <label
                    htmlFor="Automático"
                    className={darkMode ? stylesDark.square : styles.square}
                  >
                    <input
                      id="Automático"
                      type="radio"
                      {...field}
                      value="Automático"
                      name="shift"
                    ></input>
                    <span className="icon-cambio-automatico"></span>
                    Automático
                  </label>
                </div>
              )}
            />
          </div>
          <div className={darkMode ? stylesDark.error4 : styles.error4}>
            {errors.engine && (
              <p>
                <span className="icon-warning1"></span>
                {errors.engine.message}
              </p>
            )}
            {errors.shift && (
              <p>
                <span className="icon-warning1"></span>
                {errors.shift.message}
              </p>
            )}
          </div>
        </div>
        <label
          htmlFor="description"
          className={darkMode ? stylesDark.labels : styles.labels}
        >
          ¿Cómo es tu vehículo?
        </label>
        <textarea
          maxLength={500}
          placeholder="Describe el vehículo que deseas vender. Añade detalles como el modelo, color, kilometraje..."
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
          className={darkMode ? stylesDark.textArea : styles.textArea}
        />
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
        <button
          type="submit"
          className={darkMode ? stylesDark.formButton : styles.formButton}
        >
          Subir
        </button>
        {/* {showAlert && <CustomAlert message="Tu vehículo se ha subido correctamente" onClose={handleCloseAlert}/>} */}
      </form>
    </>
  );
};

export default FormVehicle;
