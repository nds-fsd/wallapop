import React from "react";
import styles from "./editProduct.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductById, updateProduct } from "../../utils/apiProducts";
import EditImages from "../EditImages/EditImages";

const EditVehicle = ({ id }) => {
  // console.log("el producto en el modal", id);

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
        <div className={styles.editContainer}>
          <div className={styles.title}>
            <label htmlFor="title" className={styles.labels}>
              Título:
            </label>
            <input
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

          <div className={styles.title}>
            <label htmlFor="brand" className={styles.labels}>
              Marca:
            </label>
            <input
              placeholder="Ej. BMW"
              {...register("brand", { required: "Este campo es obligatorio" })}
              className={styles.input}
            ></input>
            <label htmlFor="model" className={styles.labels}>
              Modelo:
            </label>
            <input
              placeholder="Ej. S1"
              {...register("model", { required: "Este campo es obligatorio" })}
              className={styles.input}
            ></input>
            <label htmlFor="year" className={styles.labels}>
              Año:
            </label>
            <input
              placeholder="De fabricación"
              {...register("year", { required: "Este campo es obligatorio" })}
              className={styles.input}
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
            <label htmlFor="doors" className={styles.labels}>
              Puertas:
            </label>
            <input
              type="number"
              placeholder="Escribe un número"
              {...register("doors")}
              className={styles.input}
            ></input>
            <label htmlFor="seats" className={styles.labels}>
              Plazas:
            </label>
            <input
              type="number"
              placeholder="Escribe un número"
              {...register("seats")}
              className={styles.input}
            ></input>
            <label htmlFor="km" className={styles.labels}>
              Kilometraje:
            </label>
            <input
              type="number"
              placeholder="Sé preciso"
              {...register("km", { required: "Este campo es obligatorio" })}
              className={styles.input}
            ></input>
          </div>

          <div className={styles.title}>
            <label htmlFor="engine" className={styles.labels}>
              Motor:
            </label>
            
            <select {...register("engine")} className={styles.input}>
              <option value="">Selecciona una opción</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diesel">Diesel</option>
              <option value="Eléctrico">Eléctirco</option>
            </select>
            
            <label htmlFor="shift" className={styles.labels}>
              Cambio:
            </label>
            <select {...register("shift")} className={styles.input}>
              <option value="">Selecciona una opción</option>
              <option value="Manual">Manual</option>
              <option value="Automático">Automático</option>
            </select>
          </div>
          </div>

          <div className={styles.labelTriple}>
            <label htmlFor="price" className={styles.labels}>
              Precio:
            </label>
            <label htmlFor="keywords" className={styles.labelKeywords}>
              Tus keywords:
            </label>
            <label htmlFor="status" className={styles.labelStatus}>
              Estado de tu vehículo:
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
              <option value="En buen estado">En buen estado</option>
              <option value="Poco uso">Poco uso</option>
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
              placeholder="Describe las ventajas del servicio o empleo que buscas para que los demás sepan por qué deben contratarte a ti y no a otro..."
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
          {product && <EditImages product={product} />}

          <div className={styles.formButton}>
            <button data-test="guardar" type="submit">
              Guardar cambios
            </button>
          </div>
      </form>
    </>
  );
};

export default EditVehicle;
