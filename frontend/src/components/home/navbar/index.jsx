import React from "react";
import ReactDOM from 'react-dom/client';
import Buscador from '../Buscador'
import Login from "../LOGIN";
import Logout from "../LOGOUT/index";

const Navbar=() => {

    return (
        
        <div>
            <Logout/>
            <Login/>
            <Buscador/>
            <h1> Compra y vende cosas de segunda mano </h1>
            <h2>Casi,casi,sin moverte del sofà</h2>
            <button>CARGAR MÁS</button>
        </div>
        
  )};
  export default Navbar