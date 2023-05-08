import React, { useEffect, useState } from "react";
import styles from './spinner.module.css'
import BeatLoader from 'react-spinners/BeatLoader'
import GridLoader from 'react-spinners/GridLoader'
import RiseLoader from 'react-spinners/RiseLoader'
import loadingGif from "../../../../frontend/storage/cochecito.svg"



const Spinner = () => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        })
    },[]) 

    return (
    <>
        {loading && (
            <div className={styles.spinner}>
                {/* <img src="/storage/cochecito.svg" alt="wait until the page loads" /> */}
                <BeatLoader color={'rgb(40, 51, 158)'} loading={loading} size={30} />
                {/* <GridLoader color={'rgb(40, 51, 158)'} loading={loading} size={40} /> */}
                {/* <RiseLoader color={'rgb(40, 51, 158)'} loading={loading} size={20} /> */}
            </div>
        )}
    </>     
    );
};

export default Spinner;

