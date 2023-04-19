import React from "react";
import { useState } from "react";
import { ReactDOM } from "react";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import PurchasesOnGoing from "./PurchasesOnGoing";
import PurchasesCompleted from "./purchases/PurchasesCompleted";

const UserPage = () => {
  return (
    //<LoginNav />
    <div>
      <div>
        <Link to="/user/profile">
          <div>
            <img></img>
            <p>Luciano C.</p> {/* El nombre se hace trayendo el nombre de usuario y cortando el apellido */}
          </div>
        </Link>
        <Link to="/user/purchases">Compras</Link>
        <Link to="/user/sales">Ventas</Link>
        <Link to="/user/products">Productos</Link>
        <Link to="/user/messages">Buzón</Link>
        <Link to="/user/favorites">Favoritos</Link>
        <Link to="/user/stats">Estadísticas</Link>
      </div>
      <div>
        <Routes>
          <Route path="/user/profile" element={<Profile />} />

          <Route path="/user/purchases" element={<Outlet />}>
            <Route path="ongoing" element={<PurchasesOnGoing />} />
            <Route path="completed" element={<PurchasesCompleted />} />
          </Route>
          <Route path="/user/sales" element={<Outlet />}>
            <Route path="ongoing" element={<SalesOnGoing />} />
            <Route path="completed" element={<SalesCompleted />} />
          </Route>
          <Route path="/user/products" element={<Outlet />}>
            <Route path="published" element={<ProductPublished />} />
            <Route path="sold" element={<ProductSold />} />
          </Route>

          <Route path="/user/messages" element={<Messages />} />

          <Route path="/user/favorites" element={<Outlet />}>
            <Route path="products" element={<FavoriteProducts />} />
            <Route path="profiles" element={<FavoriteProfiles />} />
            <Route path="searches" element={<FavoriteSearches />} />
          </Route>

          <Route path="/user/stats" element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserPage;
