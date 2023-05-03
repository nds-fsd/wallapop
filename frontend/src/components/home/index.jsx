import React from 'react';
import ListCategory from '../category/listCategory/ListCategory';
import Buscador from './Buscador';


const Home = () => {
    
    return (
        <div>
            <Buscador/>
            <h1> Compra y vende cosas de segunda mano </h1>
            <h2>Casi,casi,sin moverte del sofà</h2>
            <ListCategory />
            <button>CARGAR MÁS</button>
        </div>

    )
}


export default Home;