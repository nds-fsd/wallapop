import React from 'react'
import styles from './createProductPage.module.css'
import Form2 from './Form2';

const CreateProductPage = () => {

    return (

        <>
        
            <div className={styles.container}>
                <h2 className={styles.title}>¿Qué quieres subir hoy?</h2>
                <h4>ReTrend relanza casi todo lo que imaginas</h4>
                <div className={styles.selector}>
                    <div className={styles.vertical}>
                        <button className={styles.selection1}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Algo que no utilizo</p>
                    </div>
                    <div className={styles.vertical}>
                        <button className={styles.selection}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Una casa</p>
                    </div>
                    <div className={styles.vertical}>
                        <button className={styles.selection}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Un vehículo</p>
                    </div>
                    <div className={styles.vertical}>
                        <button className={styles.selection}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Servicio / Empleo</p>
                    </div>
                </div>
            </div>
            <div className={styles.blank}></div>
            <Form2 />
        </>
    )
}

export default CreateProductPage;