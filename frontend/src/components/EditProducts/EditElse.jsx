import React from 'react'
import styles from './editProduct.module.css'
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";


const EditElse = (prod) => {
//   const title = prod.prod.prod.title
//   const price = prod.prod.prod.price
//   const keywords = prod.prod.prod.keywords
//   const description = prod.prod.prod.description
//   const status = prod.prod.prod.status
//   const location = prod.prod.prod.location
//   const images = prod.prod.prod.images
 

// console.log(title)

  const queryClient = useQueryClient(["product"]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const mutation = useMutation(postProduct, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["product"]);
  //   },
  // });

  const onSubmit = () => {
    const words = keywords?.split(/[,\s]+/)
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword !== '') || [];
    const productData = { ...prod, keywords };    
    mutation.mutate(productData);
    reset()
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
                required: "El título es obligatorio"
              })}
              className={styles.input}
            ></input>
          </div>
          
          {errors.title && <p className={styles.error}><span className="icon-warning1"></span>{errors.title.message}</p>}
          
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
                  required: "El precio es obligatorio" 
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
            
          {errors.price && <p className={styles.error}><span className="icon-warning1"></span>{errors.price.message}</p>}
          <div className={styles.double}>
            <label htmlFor="description" className={styles.labels}>
              Descripción:
            </label>
            <textarea
              maxLength={500}
              placeholder="Describe lo fantástico que es tu producto. Añade detalles como el modelo, color, funcionalidad..."
              {...register("description", {
                required: "La descripción es obligatoria"
              })}
              className={styles.textArea}
            ></textarea> 
          </div>
          {errors.description && <p className={styles.error}><span className="icon-warning1"></span>{errors.description.message}</p>}
          {/* <FormImages />
          <Map /> */}
          <div className={styles.double}>
            <label htmlFor="location" className={styles.labels}>
              Localización:
            </label>
            <input 
              placeholder="Localización"
              {...register("location")}
              className={styles.location}>
            </input>
          </div>
          <div>
            
              {/* <div className={styles.images}>
                {prod && prod.images.map((image, _id) => (
                  <button key={image._id} className={styles.image}>{image}</button>
              ))}
              </div> */}
            

          </div>

          <button type="submit" className={styles.formButton}>
            Guardar cambios
          </button>

        </div>
      </form>
    </>
  );
};

export default EditElse;