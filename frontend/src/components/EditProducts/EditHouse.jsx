import React from "react";
import styles from "./editProduct.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductById, updateProduct } from "../../utils/apiProducts";

const EditHouse = ({ id }) => {
  console.log("el producto en el modal", id);

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
  console.log("en el form de update", product);

  const queryClient = useQueryClient(["product-updated"]);
  const mutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient?.invalidateQueries(["product-updated", id]);
    },
  });

  const onSubmit = (product) => {
    console.log(product);
    mutation.mutate(product);
  };

  // const onSubmit = (product) => {
  //   const keywords = product.keywords
  //     ?.split(/[,\s]+/)
  //     .map((keyword) => keyword.trim())
  //     .filter((keyword) => keyword !== "");
  //   const productData = { ...product, keywords: keywords || [] };
  //   reset();
  //   console.log("en el submit", productData);
  //   mutation.mutate(productData);
  // };

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
            <label htmlFor="rent" className={styles.labels}>
              Renta:
            </label>
            <select
              {...register("engine", { required: "Este campo es obligatorio" })}
              className={styles.input}
            >
              <option value="">Selecciona una opción</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>

            <label htmlFor="space" className={styles.labels}>
              Espacio:
            </label>
            <select
              {...register("space", { required: "Este campo es obligatorio" })}
              className={styles.input}
            >
              <option value="">Selecciona una opción</option>
              <option value="piso">Piso</option>
              <option value="casa">Casa</option>
              <option value="habitacion">Habitación</option>
              <option value="oficina">Oficina</option>
              <option value="garaje">Garaje</option>
              <option value="trastero">Trastero</option>
            </select>
            <label htmlFor="land" className={styles.labels}>
              Superficie:
            </label>
            <input
              type="number"
              min="1"
              {...register("land", { required: "Este campo es obligatorio" })}
              placeholder="En m2"
              className={styles.input}
            ></input>
          </div>
          <div className={styles.error2}>
            {errors.rent && (
              <p className={styles.error}>
                <span className="icon-warning1"></span>
                {errors.rent.message}
              </p>
            )}
            {errors.space && (
              <p className={styles.error}>
                <span className="icon-warning1"></span>
                {errors.space.message}
              </p>
            )}
            {errors.land && (
              <p className={styles.error}>
                <span className="icon-warning1"></span>
                {errors.land.message}
              </p>
            )}
          </div>


          <div className={styles.labelTriple}>
            <label htmlFor="price" className={styles.labels}>
              Precio:
            </label>
            <label htmlFor="keywords" className={styles.labelKeywords}>
              Tus keywords:
            </label>
            <label htmlFor="status" className={styles.labelStatus}>
              Estado de tu inmueble:
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
              <option value="Obra nueva">Obra nueva</option>
              <option value="En buen estado">En buen estado</option>
              <option value="A reformar">A reformar</option>
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
          {/* <FormImages />
          <Map /> */}

          <div>
            {/* <div className={styles.images}>
                {prod && prod.images.map((image, _id) => (
                  <button key={image._id} className={styles.image}>{image}</button>
              ))}
              </div> */}
          </div>
          <div className={styles.formButton}>
            <button type="submit">Guardar cambios</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditHouse;
