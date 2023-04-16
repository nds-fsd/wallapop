import React, { useEffect } from "react";
import styles from './product.module.css';
// import { getProductById } from '../../utils/helpers'
import Slider from "./Slider/Slider";



const ProductPage = () => {
    const mockImages = [
        'https://picsum.photos/id/1/800/600',
        'https://picsum.photos/id/2/800/600',
        'https://picsum.photos/id/3/800/600',
    ]

    // useEffect(() => {
    //     getProductById()
    // }, [refresh]);

    return (
        <div className={styles.container}>
            <h1>Este es el producto seleccionado</h1>
            <Slider images={mockImages} />

        </div>
    )
};

export default ProductPage;
