import React from 'react'
import styles from './createProductPage.module.css'
import { Controller, useForm } from 'react-hook-form'
import { postProduct } from '../../../utils/apiProducts';
import { useQuery} from 'react-query';
import FormImages from './Images';


const FormVehicle = () => {

    const onSubmit = () => {
        useQuery(['product'], postProduct, reset)}
    const { control, register, handleSubmit, reset } = useForm();

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionForm}>
            <h2 className={styles.title}>Información básica</h2>
            <label htmlFor='title' className={styles.labels}>¿Qué vas a vender hoy?</label>
  
            <Controller name='category' control={control} defaultValue={false} render={({field}) => (
                <div className={styles.category}>
                    <label htmlFor='coches'className={styles.checkbox}>
                        <input id='coches' type='radio' {...field} value='coches' name='category' className={styles.inputCategory}></input>
                        <span className='icon-sun'></span>
                        Coches
                    </label>
                    
                    <label htmlFor='motos' className={styles.checkbox}>
                        <input id='motos' type='radio' {...field} value='motos' name='category' className={styles.inputCategory}></input>
                        <span className='icon-star-empty'></span>
                        Motos
                    </label>
                </div>
            )} />
        
            <input placeholder='Dale un título a tu vehículo' {...register('title')} className={styles.input}></input>
            <div className={styles.labelTriple}>
                <label htmlFor='price' className={styles.label}>Marca</label>
                <label htmlFor='keywords' className={styles.labels}>Modelo</label>
                <label htmlFor='keywords' className={styles.labels}>Año</label>
            </div>
            <div className={styles.vehicle}>
                <input placeholder='Ej. BMW' {...register('brand')} className={styles.inputVehicle}></input>
                <input placeholder='Ej. S1' {...register('model')} className={styles.inputVehicle}></input>
                <input placeholder='De fabricación' {...register('year')} className={styles.inputVehicle}></input>
            </div>
           
            <div className={styles.line}></div>
            <h2 className={styles.title}>Información del vehículo</h2>
            <div className={styles.labelTriple}>
                <label htmlFor='doors' className={styles.label}>Puertas</label>
                <label htmlFor='seats' className={styles.labels}>Plazas</label>
                <label htmlFor='km' className={styles.labels}>Kilometraje</label>
            </div>
            <div className={styles.vehicle}>
                <input placeholder='Escribe un número' {...register('doors')} className={styles.inputVehicle}></input>
                <input placeholder='Escribe un número' {...register('seats')} className={styles.inputVehicle}></input>
                <input placeholder='Sé preciso' {...register('km')} className={styles.inputVehicle}></input>
            </div>
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
                <label htmlFor='status' className={styles.labelStatus}>Estado de tu vehículo</label>      
            </div> 
            <div className={styles.column}>       
                <select {...register('category')} className={styles.dropdown}>
                    <option value=''>Selecciona una categoría</option>
                    <option value='Coches'>Coches</option>
                    <option value='Motos'>Motos</option>
                </select>
                <select {...register('status')} className={styles.dropdown}>
                    <option value='' >Selecciona un estado</option>
                    <option value='En buen estado'>En buen estado</option>  
                    <option value='Poco uso'>Poco uso</option>
                </select>
            </div>
            <label htmlFor='description' className={styles.labels}>¿Cómo es tu vehículo?</label>
            <textarea maxLength={500} placeholder='Describe el vehículo que deseas vender. Añade detalles como el modelo, color, kilometraje...' {...register('description')} className={styles.textArea}></textarea>  
            <FormImages />
        </form>
        </>
    )
}

export default FormVehicle;