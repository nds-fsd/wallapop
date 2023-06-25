import React, { useContext, useState } from "react";
import styles from "./editProduct.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductById, updateProduct } from "../../utils/apiProducts";
import EditImages from "../EditImages/EditImages";
import { AuthContext } from "../../context/authContext";

const EditElse = ({ id }) => {
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

  const { images, setImages } = useContext(AuthContext);
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

  const handleRemoveImage = (index) => {
    console.log("Borrando imagen", index);
    setImages((prevImg) => {
      const updatedImages = [...prevImg];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    const updatedProduct = { ...product };
    updatedProduct.images = product.images.filter((_, i) => i !== index);
    reset({ ...product, images: updatedProduct.images });
  };

  const queryClient = useQueryClient(["product-updated"]);
  const mutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient?.invalidateQueries(["product-updated", id]);
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
    const updatedImages =
      images.length > 0 ? [...product.images, ...images] : product.images;
    const productData = { ...product, keywords, images: updatedImages };
    // console.log("este el producto mutado", productData)
    mutation.mutate(productData);
    alert("Los cambios se han guardado satisfactoriamente");
    setImages([updatedImages]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.editContainer}>
          <div className={styles.title}>
            <label htmlFor="title" className={styles.labels}>
              Título:
            </label>
            <input
              data-test="product-title-else"
              placeholder="Dale un título a tu producto"
              {...register("title", {
                required: "El título es obligatorio",
              })}
              className={styles.input}
            ></input>
            <label htmlFor="location" className={styles.labels}>
              Localización:
            </label>
            <input
              placeholder="Localización"
              {...register("location")}
              className={styles.input}
            ></input>
          </div>

          {errors.title && (
            <p className={styles.error}>
              <span className="icon-warning1"></span>
              {errors.title.message}
            </p>
          )}

          <div className={styles.labelTriple}>
            <label htmlFor="price" className={styles.labels}>
              Precio:
            </label>
            <label htmlFor="keywords" className={styles.labelKeywords}>
              Tus keywords:
            </label>
            <label htmlFor="status" className={styles.labelStatus}>
              Estado de tu producto:
            </label>
          </div>
          <div className={styles.columnTriple}>
            <div className={styles.price}>
              <input
                type="number"
                min="1"
                {...register("price", {
                  required: "El precio es obligatorio",
                })}
                placeholder="No te excedas..."
                className={styles.inputTriple}
              ></input>
              <div className={styles.coin}>EUR</div>
            </div>
            <input
              placeholder="Crea tus palabras clave"
              {...register("keywords")}
              className={styles.inputTriple}
            ></input>

            <select {...register("status")} className={styles.dropdown}>
              <option value="">Selecciona un estado</option>
              <option value="Como nuevo">Como nuevo</option>
              <option value="En buen estado">En buen estado</option>
              <option value="Poco uso">Poco uso</option>
              <option value="Sin estrenar">Sin estrenar</option>
            </select>
          </div>

          {errors.price && (
            <p className={styles.error}>
              <span className="icon-warning1"></span>
              {errors.price.message}
            </p>
          )}
          <div className={styles.double}>
            <label htmlFor="description" className={styles.labels}>
              Descripción:
            </label>
            <textarea
              maxLength={500}
              placeholder="Describe lo fantástico que es tu producto. Añade detalles como el modelo, color, funcionalidad..."
              {...register("description", {
                required: "La descripción es obligatoria",
              })}
              className={styles.textArea}
            ></textarea>
          </div>
          {errors.description && (
            <p className={styles.error}>
              <span className="icon-warning1"></span>
              {errors.description.message}
            </p>
          )}

          {product && (
            <EditImages
              product={product}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
              imagePreviews={imagePreviews}
              setImagePreviews={setImagePreviews}
            />
          )}

          <div className={styles.formButton}>
            <button type="submit" data-test="guardar">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditElse;
