import React from 'react'
import styles from './createProductNavBar.module.css'
import { Link, Outlet } from 'react-router-dom';

const CreateProductNavBar = () => {

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>¿Qué quieres subir hoy?</h2>
                <h4>ReTrend relanza casi todo lo que imaginas</h4>
                <div className={styles.selector}>
                    <Link to='algo-que-no-utilizo' className={styles.vertical}>
                        <button className={styles.selection1}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Algo que no utilizo</p>                    
                    </Link>
                    <Link to='inmueble' className={styles.vertical}>
                        <button className={styles.selection}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Inmueble</p>
                    </Link>
                    <Link to='vehiculo' className={styles.vertical}>
                        <button className={styles.selection}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Vehículo</p>
                    </Link>
                    <Link to='servicio-empleo' className={styles.vertical}> 
                        <button className={styles.selection}><span className='icon-home1'></span></button>
                        <p className={styles.tags}>Servicio / Empleo</p>
                    </Link >  
                    <Outlet/>
                  
                </div>
            </div>
        </>
    )
}

export default CreateProductNavBar;