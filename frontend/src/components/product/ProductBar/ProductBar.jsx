import React from 'react';
import styles from './productBar.module.css';
import { getProductByIdHarcoded } from '../../../utils/apiProducts';
import { useQuery } from 'react-query';


const ProductBar = () => {
    
    // const id = "64478295b771f5dd3c5dab95"
    const id ='644eabfc231e21681d117b7b'

    // const {data} = useQuery(['product', id], getProductById)

    const { data, isLoading } = useQuery(['product', id], getProductByIdHarcoded)
    
    return (    
        <>
        {!isLoading && (
            <div className={styles.productBar}>
                <div className={styles.productDetails}>
                    <p>{data && data.title}</p>
                    <h3>{data && data.price}</h3>
                </div>
                <button className={styles.comprar}>COMPRAR</button>
            </div>
        )}
        </>
    )
}


export default ProductBar;



