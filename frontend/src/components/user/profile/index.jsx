import React from "react";
import { Outlet, Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <div>
        <h1>Tu perfil</h1>
        <h4>Aqui puedes ver y editar los datos de tu perfil</h4>
      </div>
      <button>Cerrar sesion</button>
      <div>
        <Link to="/user/profile/info">Perfil</Link>
        <Link to="/user/profile/account">Cuenta</Link>
        <Link to="/user/profile/values">Valoraciones</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
