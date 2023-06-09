import React, { useContext, useState } from "react";
import styles from "./createProductPage.module.css";
import { useForm } from "react-hook-form";
import { postProduct } from "../../../utils/apiProducts";
import { useMutation, useQueryClient } from "react-query";
import FormImages from "../FormImages/FormImages";
import Map from "../map/Map";
import { AuthContext } from "../../../context/authContext";
import beers from "../../../assets/images/beers.png";

const FormElse = () => {
  const queryClient = useQueryClient(["product"]);
  const { images, setImages } = useContext(AuthContext);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [priceAlert, setPriceAlert] = useState(false);
  const [priceValue, setPriceValue] = useState("");

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
          <h2>Información del producto</h2>
          <div className={styles.line}></div>
        </div>
        <label htmlFor="title" className={styles.labels}>
          ¿Qué vas a vender hoy?
        </label>
        <input
          placeholder="Dale un título a tu producto"
          {...register("title", {
            required: "El título es obligatorio",
          })}
          onChange={handlePrice}
          className={styles.input}
        ></input>
        {errors.title && (
          <p className={styles.error}>
            <span className="icon-warning1"></span>
            {errors.title.message}
          </p>
        )}
        <div className={styles.labelDouble}>
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
            {...register("price", {
              required: "El precio es obligatorio",
            })}
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
        <div className={styles.labelDouble}>
          <label htmlFor="category" className={styles.labels}>
            Categoría
          </label>
          <label htmlFor="status" className={styles.labelStatus}>
            Estado de tu producto
          </label>
        </div>
        <div className={styles.column}>
          <select
            {...register("category", { required: "Selecciona una categoría" })}
            className={styles.dropdown}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Bicicletas">Bicicletas</option>
            <option value="Cine, Libros y Música">Cine, Libros y Música</option>
            <option value="Coleccionismo">Coleccionismo</option>
            <option value="Construcción y Reformas">
              Construcción y Reformas
            </option>
            <option value="Deporte y Ocio">Deporte y Ocio</option>
            <option value="Electrodomésticos">Electrodomésticos</option>
            <option value="Hogar y Jardín">Hogar y Jardín</option>
            <option value="Industria y Agricultura">
              Industria y Agricultura
            </option>
            <option value="Informática y Electrónica">
              Informática y Electrónica
            </option>
            <option value="Moda y Accesorios">Moda y Accesorios</option>
            <option value="Motor y Accesorios">Motor y Accesorios</option>
            <option value="Móviles y Telefonía">Móviles y Telefonía</option>
            <option value="Niños y Bebés">Niños y Bebés</option>
            <option value="TV, Audio y Foto">TV, Audio y Foto</option>
            <option value="Consolas y Videojuegos">
              Consolas y Videojuegos
            </option>
            <option value="Otros">Otros</option>
          </select>
          <select
            {...register("status", { required: "Selecciona una estado" })}
            className={styles.dropdown}
          >
            <option value="">Selecciona un estado</option>
            <option value="Como nuevo">Como nuevo</option>
            <option value="En buen estado">En buen estado</option>
            <option value="Poco uso">Poco uso</option>
            <option value="Sin estrenar">Sin estrenar</option>
          </select>
        </div>
        <div className={styles.status}>
          {errors.category && (
            <p className={styles.error}>
              <span className="icon-warning1"></span>
              {errors.category.message}
            </p>
          )}
          {errors.status && (
            <p className={styles.error}>
              <span className="icon-warning1"></span>
              {errors.status.message}
            </p>
          )}
        </div>

        <label htmlFor="description" className={styles.labels}>
          ¿Cómo es tu producto?
        </label>
        <textarea
          maxLength={500}
          placeholder="Describe lo fantástico que es tu producto. Añade detalles como el modelo, color, funcionalidad..."
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

export default FormElse;
