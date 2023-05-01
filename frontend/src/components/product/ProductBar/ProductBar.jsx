import React from 'react';
import styles from './productBar.module.css';


const ProductBar = ({data}) => {
       
    return (    
        <>
            <div className={styles.productBar}>
                <div className={styles.productDetails}>
                    <p>{data && data.title}</p>
                    <h3>{data && data.price}</h3>
                </div>
                <button className={styles.comprar}>COMPRAR</button>
            </div>
        </>
    )
}


export default ProductBar;



