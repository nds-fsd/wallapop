import React from 'react'
import styles from './keywords.module.css'
import { useQuery } from 'react-query';
import { getProductByIdHarcoded } from '../../../utils/apiProducts';


const Keywords = ({data}) => {

    const id ="644eabfc231e21681d117b7b"
    // const id = "644796a9d7f98ce14c6ec067"
    
    // const {data, isLoading} = useQuery(['product', id], getProductById)
    const {data: product, } = useQuery(['product', id], getProductByIdHarcoded)

    // const string = data.keywords
    // console.log(string)

    // const words = string.split(', ')
    // console.log(words)    
    console.log(product)
    
    const string = product.keywords
    const words = string.split(', ')    


    return (
       <>
            <ul className={styles.keywords}>
                {words.map((word) => (
                    <li key={word.id} className={styles.list}>#{word}</li>
                ))}
            </ul>
            {/* <ul className={styles.keywords}>
                {words.map((word) => (
                    <li key={word.id} className={styles.list}>#{word}</li>
                ))}
            </ul> */}
       </>
    )
};

export default Keywords;