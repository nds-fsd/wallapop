import React, { useState } from 'react'
import styles from './productPage.module.css'

const ExpandableMenu = () => {

    const [isExpanded, setIsExpanded] = useState (false)
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (

        <div>
            <div className={styles.expandable}>
                <h2>Descripción</h2>
                <button onClick={handleExpandClick} className={
                    !isExpanded ? styles.arrow : styles.active}><span className="icon-circle-down"></span></button>
            </div>
            {isExpanded ? '' : ''}
            {isExpanded && (
                <p>hola</p>
            )}
        </div>
    )
};

export default ExpandableMenu;