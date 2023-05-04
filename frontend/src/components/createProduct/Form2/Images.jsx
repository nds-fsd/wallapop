import React from 'react'
import styles from './images.module.css'

const FormImages = () => {

 return (
  <>
    <div className={styles.line}></div>
    <div >
      <h2 className={styles.title}>Imágenes</h2>
      <h5 className={styles.tip}><span className={styles.yellowChar}>Aquí va un consejo... Sube al menos 3 fotos de calidad.</span> Ya conoces el refrán, una imagen vale más que mil palabras.</h5>
    </div>

    <div className={styles.images}>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
    </div>
    <div>
      <input type='submit' value='Sube tu vehículo' className={styles.button}></input>
    </div>
  </>
 )
}

export default FormImages;