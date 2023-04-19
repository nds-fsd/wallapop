import React, { useEffect, useState } from "react";
import styles from './productPage.module.css';
import { getProducts } from '../../../utils/helpers';
import Slider from "../Slider/Slider";
import ProductBar from "../ProductBar/ProductBar";



const ProductPage = (props) => {
    const [refresh, setRefresh] = useState(false)
    const [product, setProduct] = useState([]);
    const { id, title, description, category, price, images, status } = product;
    const mockImages = [
        'https://picsum.photos/id/1/700/500',
        'https://picsum.photos/id/2/700/500',
        'https://picsum.photos/id/3/700/500',
    ]

    // useEffect(() => {
    //     getProductById()
    // }, [refresh]);

    // useEffect(() => {
    //     getProducts()
    // }, [refresh]);

    return (
        <div className={styles.container}>
            <div className={styles.upperBar}>
                <button className={styles.like}><span className='icon-heart1'></span></button>
                <button className={styles.chat}>CHAT</button>            
            </div>
            <Slider images={mockImages} />
            <div className={styles.details}>
                <h1>890 €</h1>
                <h2>Ordenador portátil</h2>
                <p>Como nuevo </p>
            </div>
            <div className={styles.category}>
                <span className='icon-display'></span>
                <h3>Informática y Electrónica</h3>
            </div>
            <div className={styles.line}></div>
            <p>Procesador Intel Core i9-11900H. Tarjeta gráfica NVIDIA GeForce RTX 3050 (Laptop, 65W). Pantalla de 15.6″, 2.8K (2880 x 1620), 120 Hz, OLED. Memoria de 1000GB SSD. Memoria RAM de 16GB DDR4. Peso de 1.75 kg (3.9 lbs)</p>
            <div className={styles.media}>
                <p>Comparte este producto con tus amigos</p>
                <div className={styles.mediaIcons}>
                    <span className="icon-facebook2"></span>
                    <span className="icon-twitter"></span>
                    <span className="icon-whatsapp"></span>
                    <span className="icon-mail2"></span>
                </div>  
            </div>

            <ProductBar product={product}/>
        </div>
    )
};

export default ProductPage;

{/* <div className={styles.details}>
        <h1>{product.price}</h1>
        <h2>{product.title}</h2>
        <p>{product.status}</p>
    </div>
    <div className={styles.category}>
        <span className='icon-display'></span>
        <h3>{product.category}</h3>
    </div>
    <div className={styles.line}></div>
    <p>{product.description}</p> */}

