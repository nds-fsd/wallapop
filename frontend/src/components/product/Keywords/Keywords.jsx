import React from 'react'
import styles from './keywords.module.css'


const Keywords = ({data}) => {

    const string = data.keywords
    console.log(string)

    const words = string.split(", ")
    console.log(words)
    
   

    return (
       <>
            <ul className={styles.keywords}>
                {words.map((word) => (
                    <li key={words.id} className={styles.list}>#{word}</li>
                ))}
            </ul>
       </>
    )
};

export default Keywords;