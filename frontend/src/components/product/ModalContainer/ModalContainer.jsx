import React from 'react';
import { useQuery } from 'react-query'
import { getProductByIdHarcoded } from '../../../utils/api';
import styles from './modalContainer.module.css'



const ModalContainer = () => {

    const id ='64478295b771f5dd3c5dab95'

    // const {data} = useQuery(['product', id], getProductById)

    const { data, isLoading } = useQuery(['product', id], getProductByIdHarcoded)

    return (

    <>
        {!isLoading && (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.title}>
                        <h3 className={styles.name}>Imágenes de: {data && data.title}</h3>
                        <button className={styles.close}><span className='icon-cross1'></span></button>
                        <div className={styles.line}></div>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}


export default ModalContainer;


    

