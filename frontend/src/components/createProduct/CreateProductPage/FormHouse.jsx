import React, { useContext, useState } from "react";
import styles from "./createProductPage.module.css";
import { Controller, useForm } from "react-hook-form";
import { postProduct } from "../../../utils/apiProducts";
import { useMutation, useQueryClient } from "react-query";
import FormImages from "../FormImages/FormImages";
import { AuthContext } from "../../../context/authContext";
import beers from "../../../assets/images/beers.png";


const FormHouse = () => {
  const queryClient = useQueryClient(["product"]);
  const { images, setImages } = useContext(AuthContext);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [priceAlert, setPriceAlert] = useState(false);
  const [priceValue, setPriceValue] = useState("");

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

  const handleAlertAccept = () => {
    setShowAlert(false);
  };

  const handlePrice = (event) => {
    const { value } = event.target;
    if (value && value.includes(".")) {
      setPriceAlert(true);
    } else {
      setPriceAlert(false);
    }
    setPriceValue(value);
  };

  const handlePriceAccept = () => {
    setPriceAlert(false);
  };
  const onSubmit = (data) => {
    const keywords = data.keywords
      ?.split(/[, ]+/)
      .filter((keyword) => keyword !== "");

    const productData = { ...data, images };
    if (keywords && keywords.length > 0) {
      productData.keywords = keywords;
    } else {
      delete productData.keywords;
    }
    mutation.mutate(productData);
    setShowAlert(true);
    reset();
    setImages([]);
  };

  return (
    <>
      {showAlert && (
        <div className={styles.alert}>
          Tu producto se ha subido correctamente
          <button onClick={handleAlertAccept} className={styles.accept}>
            Aceptar
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionForm}>
        <div className={styles.title}>
          <h2>Información de tu inmueble</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.inmuebles}>
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
        <label htmlFor="Alquiler" className={styles.labels}>
          ¿Alquilas o vendes?
        </label>
        <Controller
          name="rent"
          control={control}
          defaultValue={false}
          rules={{ required: "Selecciona una opción" }}
          render={({ field }) => (
            <div className={styles.category}>
              <label htmlFor="Alquiler" className={styles.checkbox}>
                <input
                  id="Alquiler"
                  type="radio"
                  {...field}
                  value="Alquiler"
                  name="rent"
                ></input>
                <span className="icon-alquiler"></span>
              </label>

              <label htmlFor="Venta" className={styles.checkbox}>
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
          <p className={styles.error1}>
            <span className="icon-warning1"></span>
            {errors.rent.message}
          </p>
        )}
        <label htmlFor="title" className={styles.labels}>
          ¿Qué ofreces?
        </label>
        <input
          placeholder="Dale un título a tu inmueble"
          {...register("title", { required: "El título es obligatorio" })}
          className={styles.input}
        ></input>
        {errors.title && (
          <p className={styles.error}>
            <span className="icon-warning1"></span>
            {errors.title.message}
          </p>
        )}
        <label htmlFor="space" className={styles.labels}>
          ¿De qué espacio se trata?
        </label>
        <div>
          <Controller
            name="space"
            control={control}
            defaultValue={false}
            rules={{ required: "Selecciona una opción" }}
            render={({ field }) => (
              <div className={styles.type}>
                <label htmlFor="Piso" className={styles.square}>
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
                <label htmlFor="Casa" className={styles.square}>
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
                <label htmlFor="Habitación" className={styles.square}>
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
                <label htmlFor="Oficina" className={styles.square}>
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
                <label htmlFor="Garaje" className={styles.square}>
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
                <label htmlFor="Trastero" className={styles.square}>
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
          <p className={styles.error}>
            <span className="icon-warning1"></span>
            {errors.space.message}
          </p>
        )}
        <div className={styles.labelDouble}>
          <label htmlFor="land" className={styles.labels}>
            Superficie
          </label>
          <label htmlFor="status" className={styles.labelStatus}>
            Estado de tu inmueble
          </label>
        </div>
        <div className={styles.column}>
          <input
            type="number"
            min="1"
            {...register("land", { required: "Este campo es obligatorio" })}
            placeholder="En m2"
            className={styles.inputLand}
          ></input>
          <select
            {...register("status", { required: "Selecciona un estado" })}
            className={styles.dropdown}
          >
            <option value="">Selecciona un estado</option>
            <option value="Obra nueva">Obra nueva</option>
            <option value="En buen estado">En buen estado</option>
            <option value="A reformar">A reformar</option>
          </select>
        </div>
        <div className={styles.status}>
          {errors.land && (
            <p className={styles.error}>
              <span className="icon-warning1"></span>
              {errors.land.message}
            </p>
          )}
          {errors.status && (
            <p className={styles.error}>
              <span className="icon-warning1"></span>
              {errors.status.message}
            </p>
          )}
        </div>
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
            onChange={handlePrice}
            placeholder="No te excedas..."
            className={styles.inputPrice}
          ></input>
          <div className={styles.coin}>EUR</div>
          <input
            placeholder="Crea tus palabras clave"
            {...register("keywords")}
            className={styles.inputKeywords}
          ></input>
          {priceAlert && (
            <div className={styles.alert}>
              Mejor guarda esas monedas para unas cañas
              <img src={beers} className={styles.beer} />
              <button onClick={handlePriceAccept} className={styles.accept}>
                Aceptar
              </button>
            </div>
          )}
        </div>
        {errors.price && (
          <p className={styles.error}>
            <span className="icon-warning1"></span>
            {errors.price.message}
          </p>
        )}
        <label htmlFor="description" className={styles.labels}>
          ¿Cómo es tu inmueble?
        </label>
        <textarea
          maxLength={2000}
          placeholder="Describe los detalles más llamativos de tu espacio..."
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
          className={styles.textArea}
        ></textarea>
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
      </form>
    </>
  );
};

export default FormHouse;
