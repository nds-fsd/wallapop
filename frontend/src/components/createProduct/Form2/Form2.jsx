import React from 'react'
import styles from './form.module.css'
import { useForm } from 'react-hook-form'
import { postProduct } from '../../../utils/apiProducts';
import { useQuery} from 'react-query';
import Spinner from '../../Spinner/Spinner';


const Form2 = () => {

    const onSubmit =() => {
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
        {isLoading && (
            <div>
                <Spinner />
            </div>
        )}

        {!isLoading && (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <input placeholder='Escribe el título del producto' {...register('title')}></input>
            <input placeholder='Describe el producto' {...register('description')}></input>
            <input type='number' {...register('price')} ></input>
            <select {...register('category')}>
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
            <input {...register('status')} placeholder='Estado del producto'></input>
            <input type='submit' value='Crear'></input>
            <input type='submit' value='Sube tus imágenes'></input>
        </form>
        )}
    </>   
    )
};


export default Form2