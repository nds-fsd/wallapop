import React from "react";
import { Route, Routes, Outlet, Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <div>
        <h1>Tu perfil</h1>
        <h4>Aqui puedes ver y editar los datos de tu perfil</h4>
      </div>
      <button>Cerrar sesion</button>
      <nav>
        <Link to="/user/profile/info">Perfil</Link>
        <Link to="/user/profile/account">Cuenta</Link>
        <Link to="/user/profile/values">Valoraciones</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/user/profile/info" element={<ProfileInfo />} />
          <Route path="/user/profile/account" element={<ProfileAccount />} />
          <Route path="/user/profile/values" element={<ProfileValues />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
