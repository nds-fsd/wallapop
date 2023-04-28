import React, { useEffect, useState } from "react";
import {getProductByIdHarcoded} from '../../../utils/api';
import { useQuery, useMutation } from 'react-query'
import styles from './productPage.module.css';
import Slider from "../Slider/Slider";
import ProductBar from "../ProductBar/ProductBar";
import BeatLoader from 'react-spinners/BeatLoader'
import GridLoader from 'react-spinners/GridLoader'
import RiseLoader from 'react-spinners/RiseLoader'
import Spinner from "../../spinner/Spinner";




const ProductPage = () => {
    let startTime = performance.now();
    while (performance.now() - startTime < 500) {
      // Do nothing for 500 ms to emulate extremely slow code
    };

    const mockImages = [
        'https://picsum.photos/id/1/700/500',
        'https://picsum.photos/id/2/700/500',
        'https://picsum.photos/id/3/700/500',
    ]  
    


    const [isExpanded, setIsExpanded] = useState (false)
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const id ="64478295b771f5dd3c5dab95"
    // const id = "644796a9d7f98ce14c6ec067"
    
    // const {data, isLoading} = useQuery(['product', id], getProductById)
    const {data, isLoading} = useQuery(['product', id], getProductByIdHarcoded)
    // console.log(data)


    return (
    <>
        {isLoading && (
            <div>
                <Spinner />
            </div>
        )}

        {!isLoading && (
            <div className={styles.container}>
                <div className={styles.upperBar}>
                    <button className={styles.like}><span className='icon-heart1'></span></button>
                    <button className={styles.chat}>CHAT</button>            
                </div>
                <Slider images={mockImages}/>
                <div className={styles.details}>
                    <div className={styles.priceContainer}>
                        <h1 className={styles.price}>{data && data.price}</h1>
                        <h2>EUR</h2>
                    </div>
                    <h2>{data && data.title}</h2>
                    <p>{data && data.status}</p>
                </div>
                <div className={styles.category}>
                    <span className='icon-display'></span>
                    <h3>{data && data.category}</h3>
                </div>
                <div className={styles.line}></div>
                <div>
                    <div className={styles.expandable}>
                        <h3>DESCRIPCIÓN DEL PRODUCTO</h3>
                        <button onClick={handleExpandClick} className={
                        !isExpanded ? styles.arrow : styles.active}><span className="icon-circle-down"></span></button>
                    </div>
                    {isExpanded ? '' : ''}
                    {isExpanded && (
                        <p>{data && data.description}</p>
                    )}
                </div>
                <div className={styles.media}>
                    <p>Comparte este producto con tus amigos</p>
                    <div className={styles.mediaIcons}>
                        <span className="icon-facebook2"></span>
                        <span className="icon-twitter"></span>
                        <span className="icon-whatsapp"></span>
                        <span className="icon-mail2"></span>
                    </div>  
                </div>
                    <ProductBar data={data && data}/>
            </div>
            )}  
    </>
    )
};

export default ProductPage;

    // <div className={styles.details}>
    //             <h1>890 €</h1>
    //             <h2>Ordenador portátil</h2>
    //             <p>Como nuevo </p>
    //         </div>
    //         <div className={styles.category}>
    //             <span className='icon-display'></span>
    //             <h3>Informática y Electrónica</h3>
    //         </div>
    //         <div className={styles.line}></div>
    //         <p>Procesador Intel Core i9-11900H. Tarjeta gráfica NVIDIA GeForce RTX 3050 (Laptop, 65W). Pantalla de 15.6″, 2.8K (2880 x 1620), 120 Hz, OLED. Memoria de 1000GB SSD. Memoria RAM de 16GB DDR4. Peso de 1.75 kg (3.9 lbs)</p>
    //         <div className={styles.media}></div>

