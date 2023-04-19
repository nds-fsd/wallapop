import React from 'react';
import styles from './productBar.module.css';
// import { getProductById } from '../../../utils/helpers';



const ProductBar = ({ product }) => {

    return (

        <div className={styles.productBar}>
            <div className={styles.productDetails}>
                <p>Ordenador portátil</p>
                <h3>890 €</h3>
            </div>
            <button className={styles.comprar}>COMPRAR</button>
        </div>
    )
}


export default ProductBar;

{/* <div className={styles.productBar}>
    <div className={styles.productDetails}>
        <p>{product.title</p>
        <h3>{product.price}</h3>
    </div>
    <button className={styles.comprar}>COMPRAR</button>
</div> */}

