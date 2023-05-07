import React, { useState } from 'react'
import styles from './keywords.module.css'
import { useQuery } from 'react-query';
import { getProductByIdHarcoded } from '../../../utils/apiProducts';


const Keywords = ({data}) => {

    console.log(data)
    const words = data.keywords
    console.log(words)
    
    const [keys, setKeys] = useState(false)

    return (
       <>
       {keys && (
            <ul className={styles.keywords}>
            {words.map((word) => (
                <li key={word.id} className={styles.list}>#{word}</li>
            ))}
            </ul>
       )}
            
       </>
    )
};

export default Keywords;