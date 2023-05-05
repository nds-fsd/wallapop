import React from 'react'
import styles from './createProductPage.module.css'
import { Controller, useForm } from 'react-hook-form'
import { postProduct } from '../../../utils/apiProducts';
import { useQuery} from 'react-query';
import FormImages from './Images';


const FormHouse = () => {

    const onSubmit = () => {
        useQuery(['product'], postProduct, reset)}
    const { control, register, handleSubmit, reset } = useForm();

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionForm}>
            <div className={styles.inmueblesTitle}>
                <div className={styles.inmuebles}>
                    <h2>Información de tu inmueble</h2>
                    <div className={styles.inmuebles}>
                        {/* Este input controlorá que la categoría esté checkeada por defecto sin ser vista en pantalla */}
                        <Controller name='category' control={control} defaultValue={true} render={({field}) => (
                            <div>
                                <label htmlFor='category'></label>
                                <input id='inmuebles' type='checkbox' {...field} value ='inmobiliaria' checked></input>
                            </div>    
                        )}/> 
                    </div>
                </div>
                <div className={styles.line2}></div>
            </div>
                     
            <label htmlFor='alquiler' className={styles.labels}>¿Alquilas o vendes?</label>
            <Controller name='category' control={control} defaultValue={false} render={({field}) => (
                <div className={styles.category}>
                    <label htmlFor='alquiler'className={styles.checkbox}>
                        <input id='alquiler' type='radio' {...field} value='alquiler' name='category'></input>
                        <span className='icon-sun'></span>
                        Alquiler
                    </label>
                    
                    <label htmlFor='venta' className={styles.checkbox}>
                        <input id='venta' type='radio' {...field} value='venta' name='category'></input>
                        <span className='icon-star-empty'></span>
                        Venta
                    </label>
                </div>
            )} />
            <label htmlFor='title' className={styles.labels}>¿Qué ofreces?</label>
            <input placeholder='Dale un título a tu inmueble' {...register('title')} className={styles.input}></input>
            
            <label htmlFor='type' className={styles.labels}>¿De qué espacio se trata?</label>
            <div>
                <Controller name='type' control={control} defaultValue={false} render={({field}) => (
                    <div className={styles.type}>
                        <label htmlFor='piso' className={styles.square}>
                            <input id='piso' type='radio' {...field} value='piso' name='type'></input>
                            <span className='icon-star-empty'></span>
                            Piso
                        </label>
                        <label htmlFor='casa' className={styles.square}>
                            <input id='casa' type='radio' {...field} value='casa' name='type'></input>
                            <span className='icon-star-empty'></span>
                            Casa
                        </label> 
                        <label htmlFor='habitacion' className={styles.square}>
                            <input id='habitacion' type='radio' {...field} value='habitacion' name='type'></input>
                            <span className='icon-star-empty'></span>
                            Habitación
                        </label> 
                        <label htmlFor='oficina' className={styles.square}>
                            <input id='oficina' type='radio' {...field} value='oficina' name='type'></input>
                            <span className='icon-star-empty'></span>
                            Oficina
                        </label>
                        <label htmlFor='garaje' className={styles.square}>
                            <input id='garaje' type='radio' {...field} value='garaje' name='type'></input>
                            <span className='icon-star-empty'></span>
                            Garaje
                        </label>
                        <label htmlFor='trastero' className={styles.square}>
                            <input id='trastero' type='radio' {...field} value='trastero' name='type'></input>
                            <span className='icon-star-empty'></span>
                            Trastero
                        </label>    
                    </div>    
                )} />
            </div>

            <div className={styles.labelDouble}>
                <label htmlFor='land' className={styles.labels}>Superficie</label>
                <label htmlFor='status' className={styles.labelStatus}>Estado de tu inmueble</label>      
            </div> 
            <div className={styles.column}>       
                <input type='number' min='1' {...register('land')} placeholder='En m2' className={styles.inputLand}></input>
                <select {...register('status')} className={styles.dropdown}>
                    <option value='' >Selecciona un estado</option>
                    <option value='Obra nueva'>Obra nueva</option>  
                    <option value='En buen estado'>En buen estado</option>
                    <option value='A reformar'>A reformar</option>
                </select>
            </div>
            
            <div>
                <label htmlFor='price' className={styles.labels}>Ponle precio</label>
                <label htmlFor='keywords' className={styles.labelKeywords}>Keywords</label>
            </div>
            <div className={styles.price}>
                <input type='number' min='1' {...register('price')} placeholder='No te excedas...' className={styles.inputPrice}></input>
            <div className={styles.coin}>EUR</div>  
                <input placeholder='Crea tus palabras clave' {...register('keywords')} className={styles.inputKeywords}></input> 
            </div>

            <label htmlFor='description' className={styles.labels}>¿Cómo es tu vehículo?</label>
            <textarea maxLength={500} placeholder='Describe los detalles más llamativos de tu espacio...' {...register('description')} className={styles.textArea}></textarea>  
            <FormImages />
        </form>
        </>
    )
}

export default FormHouse;