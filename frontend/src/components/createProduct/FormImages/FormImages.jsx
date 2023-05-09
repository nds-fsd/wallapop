import React from 'react'
import styles from './formImages.module.css'

const FormImages = () => {

 return (
  <>
    <div >
      <h2>Imágenes</h2>
      <div className={styles.line}></div>
      <h5 className={styles.tip}><span className={styles.boldChar}>Aquí va un consejo... Sube al menos 3 fotos de calidad.</span> Ya conoces el refrán, una imagen vale más que mil palabras.</h5>
    </div>

    <div className={styles.images}>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
      <button className={styles.image}><span className='icon-image1'></span></button>
    </div>
    {/* <div>
      <input type='submit' value='Subir' className={styles.button}></input>
    </div> */}
  </>
 )
}

export default FormImages;