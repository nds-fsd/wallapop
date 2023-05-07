import React, { useState } from 'react'
import styles from './productPage.module.css'
import {getProductByIdHarcoded} from '../../../utils/apiProducts';
import { useQuery } from 'react-query'
import Slider from '../Slider/Slider'
import Keywords from '../Keywords/Keywords'
import ProductBar from '../ProductBar/ProductBar'


const ElsePage = () => {

  const mockImages = [
    'https://picsum.photos/id/1/700/500',
    'https://picsum.photos/id/2/700/500',
    'https://picsum.photos/id/3/700/500',
  ]  

  const [isExpanded, setIsExpanded] = useState (false)
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  //id de un servicio
  // const id = '644ebdbcf1b76b31b761b41c';
  const id ="644eabfc231e21681d117b7b"


  // const {data, isLoading} = useQuery(['product', id], getProductById)
  const {data} = useQuery(['product', id], getProductByIdHarcoded)
  // console.log(data)

  return (
    <>
      <div className={styles.productPage}>
        <div className={styles.container}>
          <div className={styles.upperBar}>
            <button className={styles.like}><span className='icon-heart1'></span></button>
            <button className={styles.chat}>CHAT</button>            
          </div>
          { data && <Slider images={mockImages} data={data}/>}
          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <h1 className={styles.price}>{data && data.price}</h1>
              <h2>EUR</h2>
            </div>
            <div className={styles.category}>
              <span className='icon-display'></span>
              <h3>{data && data.category}</h3>
            </div>
          </div>
            
          <h2>{data && data.title}</h2>
          { data && <Keywords data={data}/>}               
             
        <div className={styles.line}></div>
        <div className={styles.expandable}>
           <h3>DESCRIPCIÓN DEL PRODUCTO</h3>
            <button onClick={handleExpandClick} className={
            !isExpanded ? styles.arrow : styles.active}><span className="icon-circle-down"></span></button>
        </div>
        {isExpanded ? '' : ''}
        {isExpanded && (
        <p className={styles.textExpanded}>{data && data.description}</p>
        )}

        <div className={styles.media}>
          <p>Comparte este producto con tus amigos</p>
          <div className={styles.mediaIcons}>
            <span className="icon-facebook2"></span>
            <span className="icon-twitter"></span>
            <span className="icon-whatsapp"></span>
            <span className="icon-mail2"></span>
          </div>  
        </div>
        {data && <ProductBar data={data}/>}
      </div>
    </div>
  </>
  );
};

export default ElsePage;