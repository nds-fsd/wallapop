import React from 'react'
import styles from './createProductPage.module.css'
import { useForm } from 'react-hook-form'
import { postProduct } from '../../../utils/apiProducts';
import { useQuery} from 'react-query';


const FormHouse = () => {

    const onSubmit = () => {
        useQuery(['product'], postProduct, reset)}
    const { register, handleSubmit, reset } = useForm();

    return (
        <>

        </>
    )
}

export default FormHouse;