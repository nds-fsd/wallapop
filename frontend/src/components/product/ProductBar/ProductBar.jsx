import React from 'react';
import styles from './productBar.module.css';


const ProductBar = ({ product }) => {
    
    // const { data } = useQuery('products', 
    // () => api.get(`/products/${data._id}`)
    // .then(res => res.data)
    // .catch(e => console.log(e)));
    
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

