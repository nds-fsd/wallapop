import React from 'react'
import styles from './createProductPage.module.css'
import { useForm } from 'react-hook-form'
import { postProduct } from '../../../utils/apiProducts';
import { useQuery} from 'react-query';
import Spinner from '../../spinner/Spinner';


const Form2 = () => {

    const onSubmit = () => {
        useQuery(['product'], postProduct, reset)}
    const { register, handleSubmit, reset } = useForm();

    // const { data, isLoading } = onSubmit
    // const onSubmit = async (newProduct) => {
    // await api.post('products/newProduct', newProduct)
    // .then(res => res.data)
    // .catch(error => console.log(error))
    // .finally(() => {
    //     queryClient?.invalidateQueries('products')
    // })
    // reset()
    // }



   
        
        
    return (
    <>
        {/* {isLoading && (
            <div>
                <Spinner />
            </div>
        )} */}

        
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionForm}>
            <h2 className={styles.title}>Información del producto</h2>
            <label htmlFor='title' className={styles.labels}>¿Qué vas a vender hoy?</label>
            <input placeholder='Dale un título a tu producto' {...register('title')} className={styles.input}></input>
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
                    <option value='Informática y Electrónica'>Informática y Electrónica</option>
                    <option value='TV, Audio y Foto'>TV, Audio y Foto</option>  
                    <option value='Móviles y Telefonía'>Móviles y Telefonía</option>
                    <option value='Bicicletas'>Bicicletas</option>
                    <option value='Electrodomésticos'>Electrodomésticos</option>
                    <option value='Consolas y Videojuegos'>Consolas y Videojuegos</option>
                    <option value='Cine, Libros y Música'>Cine, Libros y Música</option>
                    <option value='Niños y Bebés'>Niños y Bebés</option>
                    <option value='Coleccionismo'>Coleccionismo</option>
                    <option value='Construcción y Reformas'>Construcción y Reformas</option>
                    <option value='Industria y Agricultura'>Industria y Agricultura</option>
                    <option value='Coches'>Coches</option>
                    <option value='Motos'>Motos</option>
                    <option value='Motor y Accesorios'>Motor y Accesorios</option>
                    <option value='Moda y Accesorios'>Moda y Accesorios</option>
                    <option value='Inmobiliaria'>Inmobiliaria</option>
                    <option value='Hogar y Jardín'>Hogar y Jardín</option>
                    <option value='Deporte y Ocio'>Deporte y Ocio</option>
                    <option value='Servicios'>Servicios</option>
                    <option value='Empleo'>Empleo</option>
                    <option value='Otros'>Otros</option>
                </select>
                <select {...register('status')} className={styles.dropdown}>
                    <option value='' >Selecciona un estado</option>
                    <option value='Como nuevo'>Como nuevo</option>
                    <option value='En buen estado'>En buen estado</option>  
                    <option value='Poco uso'>Poco uso</option>
                    <option value='Sin estrenar'>Sin estrenar</option>
                </select>
            </div>
            <label htmlFor='description' className={styles.labels}>¿Cómo es tu producto?</label>
            <textarea maxLength={500} placeholder='Describe lo fantástico que es tu producto. Añade detalles como el modelo, color, funcionalidad...' {...register('description')} className={styles.textArea}></textarea>  
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
            <input type='submit' value='Sube tu producto' className={styles.button}></input>

        </form>
        
        

    </>   
    )
};


export default Form2