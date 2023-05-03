import React from 'react'
import styles from './createProductPage.module.css'
import { useForm } from 'react-hook-form'
import { postProduct } from '../../../utils/api';
import { useQuery} from 'react-query';


const FormJob = () => {

    const onSubmit = () => {
        useQuery(['product'], postProduct, reset)}
    const { register, handleSubmit, reset } = useForm();

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionForm}>
            <h2 className={styles.title}>Información del servicio / empleo</h2>
            <label htmlFor='title' className={styles.labels}>¿Qué ofreces?</label>
            <input placeholder='Dale un título a tu servicio / empleo' {...register('title')} className={styles.input}></input>
            <div className={styles.labelDouble}>
                <label htmlFor='price' className={styles.labels}>Ponle precio</label>
                <label htmlFor='keywords' className={styles.labelKeywords}>Keywords</label>
            </div>
            <div className={styles.price}>
                <input type='number' min='1' {...register('price')} placeholder='No te excedas...' className={styles.inputPrice}></input>
                <div className={styles.coin}>EUR</div>  
                <input placeholder='Crea tus palabras clave' {...register('keywords')} className={styles.inputKeywords}></input> 
            </div>
            <div className={styles.labelDouble}>
                <label htmlFor='category' className={styles.labels}>Categoría</label>
                <label htmlFor='status' className={styles.labelStatus}>Estado de tu producto</label>      
            </div> 
            <div className={styles.column}>       
                <select {...register('category')} className={styles.dropdown}>
                    <option value=''>Selecciona una categoría</option>
                    <option value='Servicios'>Servicios</option>
                    <option value='Empleo'>Empleo</option>
                </select>
                <select {...register('status')} className={styles.dropdown}>
                    <option value='' >Selecciona un estado</option>
                    <option value='Horas a convenir'>Como nuevo</option>
                    <option value='Por la mañana'>En buen estado</option>  
                    <option value='Por la tarde'>Poco uso</option>
                </select>
            </div>
            <label htmlFor='description' className={styles.labels}>¿Cómo es tu producto?</label>
            <textarea maxLength={500} placeholder='Describe las ventajas del servicio o empleo que buscas para que los demás sepan por qué deben contratarte a ti...' {...register('description')} className={styles.textArea}></textarea>  
            
            <div>
                <div className={styles.line}></div>
                <h2 className={styles.title}>Imágenes</h2>
                <h5><span className={styles.yellowChar}>Aquí va un consejo... Sube al menos 3 fotos de calidad.</span> Ya conoces el refrán, una imagen vale más que mil palabras.</h5>
                <div className={styles.images}>
                    <button className={styles.image}><span className='icon-image1'></span></button>
                    <button className={styles.image}><span className='icon-image1'></span></button>
                    <button className={styles.image}><span className='icon-image1'></span></button>
                    <button className={styles.image}><span className='icon-image1'></span></button>
                    <button className={styles.image}><span className='icon-image1'></span></button>
                </div>
            </div>
            <input type='submit' value='Sube tu servicio' className={styles.button}></input>

        </form>
        </>
    )
}

export default FormJob;