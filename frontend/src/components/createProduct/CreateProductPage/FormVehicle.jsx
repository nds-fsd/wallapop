import React, { useContext, useState } from "react";
import styles from "./createProductPage.module.css";
import { Controller, useForm } from "react-hook-form";
import { postProduct } from "../../../utils/apiProducts";
import { useMutation, useQueryClient } from "react-query";
import FormImages from "../FormImages/FormImages";
import Map from "../map/Map";
import CustomAlert from "../../CustomAlert/CustomAlert";
import { AuthContext } from "../../../context/authContext";

const FormVehicle = () => {
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

  // const [showAlert, setShowAlert] = useState(false)
  // const handleCloseAlert = () => {
  //   setShowAlert(false);
  // };

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

  // console.log(errors)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionForm}>
        <div className={styles.title}>
          <h2>Información básica</h2>
          <div className={styles.line}></div>
        </div>
        <label htmlFor="title" className={styles.labels}>
          ¿Qué vas a vender hoy?
        </label>

        <div className={styles.category}>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Selecciona una categoría" }}
            render={({ field }) => (
              <div className={styles.category}>
                <label htmlFor="Coches" className={styles.checkbox}>
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

                <label htmlFor="Motos" className={styles.checkbox}>
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
          <p className={styles.error1}>
            <span className="icon-warning1"></span>
            {errors.category.message}
          </p>
        )}

        <label htmlFor="title" className={styles.labels}>
          ¿Qué ofreces?
        </label>
        <input
          placeholder="Dale un título a tu vehículo"
          {...register("title", { required: "El título es obligatorio" })}
          className={styles.input}
        ></input>
        {errors.title && (
          <p className={styles.error}>
            <span className="icon-warning1"></span>
            {errors.title.message}
          </p>
        )}
        <div className={styles.labelTriple}>
          <label htmlFor="brand" className={styles.labels}>
            Marca
          </label>
          <label htmlFor="model" className={styles.labels}>
            Modelo
          </label>
          <label htmlFor="year" className={styles.labels}>
            Año
          </label>
        </div>
        <div className={styles.vehicle}>
          <input
            placeholder="Ej. BMW"
            {...register("brand", { required: "Este campo es obligatorio" })}
            className={styles.inputVehicle}
          ></input>
          <input
            placeholder="Ej. S1"
            {...register("model", { required: "Este campo es obligatorio" })}
            className={styles.inputVehicle}
          ></input>
          <input
            placeholder="De fabricación"
            {...register("year", { required: "Este campo es obligatorio" })}
            className={styles.inputVehicle}
          ></input>
        </div>
        <div className={styles.error2}>
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

        <div className={styles.title}>
          <h2>Información del vehículo</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.labelTriple2}>
          <label htmlFor="doors" className={styles.labels}>
            Puertas
          </label>
          <label htmlFor="seats" className={styles.labels}>
            Plazas
          </label>
          <label htmlFor="km" className={styles.labels}>
            Kilometraje
          </label>
        </div>
        <div className={styles.vehicle}>
          <input
            type="number"
            placeholder="Escribe un número"
            {...register("doors")}
            className={styles.inputVehicle}
          ></input>
          <input
            type="number"
            placeholder="Escribe un número"
            {...register("seats")}
            className={styles.inputVehicle}
          ></input>
          <input
            type="number"
            placeholder="Sé preciso"
            {...register("km", { required: "Este campo es obligatorio" })}
            className={styles.inputVehicle}
          ></input>
        </div>
        {errors.km && (
          <p className={styles.error3}>
            <span className="icon-warning1"></span>
            {errors.km.message}
          </p>
        )}
        <div>
          <label htmlFor="price" className={styles.labels}>
            Ponle precio
          </label>
          <label htmlFor="keywords" className={styles.labelKeywords}>
            Keywords
          </label>
        </div>
        <div className={styles.price}>
          <input
            type="number"
            min="1"
            {...register("price", { required: "El precio es obligatorio" })}
            placeholder="No te excedas..."
            className={styles.inputPrice}
          ></input>
          <div className={styles.coin}>EUR</div>
          <input
            placeholder="Crea tus palabras clave"
            {...register("keywords")}
            className={styles.inputKeywords}
          ></input>
        </div>
        {errors.price && (
          <p className={styles.error}>
            <span className="icon-warning1"></span>
            {errors.price.message}
          </p>
        )}

        <label htmlFor="status" className={styles.labels}>
          Estado de tu vehículo
        </label>
        <div>
          <select
            {...register("status", { required: "Selecciona un estado" })}
            className={styles.dropdown}
          >
            <option value="">Selecciona un estado</option>
            <option value="En buen estado">En buen estado</option>
            <option value="Poco uso">Poco uso</option>
          </select>
        </div>
        {errors.status && (
          <p className={styles.error}>
            <span className="icon-warning1"></span>
            {errors.status.message}
          </p>
        )}

        <div>
          <label htmlFor="engine" className={styles.labels}>
            Motor
          </label>
          <label htmlFor="shift" className={styles.labelShift}>
            Cambio
          </label>
        </div>
        <div>
          <div className={styles.motor}>
            <Controller
              name="engine"
              control={control}
              defaultValue={false}
              rules={{ required: "Selecciona una opción" }}
              render={({ field }) => (
                <div className={styles.engine}>
                  <label htmlFor="Gasolina" className={styles.square}>
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
                  <label htmlFor="Diesel" className={styles.square}>
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
                  <label htmlFor="Eléctrico" className={styles.square}>
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
                <div className={styles.engine}>
                  <label htmlFor="Manual" className={styles.square}>
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
                  <label htmlFor="Automático" className={styles.square}>
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
          <div className={styles.error4}>
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
        <label htmlFor="description" className={styles.labels}>
          ¿Cómo es tu vehículo?
        </label>
        <textarea
          maxLength={500}
          placeholder="Describe el vehículo que deseas vender. Añade detalles como el modelo, color, kilometraje..."
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
          className={styles.textArea}
        />
        {errors.description && (
          <p className={styles.error}>
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

        <button type="submit" className={styles.formButton}>
          Subir
        </button>
        {/* {showAlert && <CustomAlert message="Tu vehículo se ha subido correctamente" onClose={handleCloseAlert}/>} */}
      </form>
    </>
  );
};

export default FormVehicle;
