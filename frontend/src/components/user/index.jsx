import React from "react";
import { Route, Routes, Outlet, Link, Navigate } from "react-router-dom";
import PurchasesOnGoing from "./purchases/PurchasesOnGoing";
import PurchasesCompleted from "./purchases/PurchasesCompleted";
import Stats from "./stats/Stats";
import SalesCompleted from "./sales/SalesCompleted";
import SalesOnGoing from "./sales/SalesOnGoing";
import Profile from "./profile/index";
import ProductSold from "./products/ProductSold";
import ProductPublished from "./products/ProductPublished";
import Messages from "./messages/Messages";
import FavoriteProducts from "./favorites/FavoriteProducts";
import FavoriteProfiles from "./favorites/FavoriteProfiles";
import FavoriteSearches from "./favorites/FavoriteSearches";
import Purchases from "./purchases";
import Sales from "./sales";
import Products from "./products";
import Favorites from "./favorites";
import ProfileAccount from "./profile/ProfileAccount";
import ProfileInfo from "./profile/ProfileInfo";
import ProfileValues from "./profile/ProfileValues";
import {
  FAVORITE_PRODUCTS,
  FAVORITE_PROFILES,
  FAVORITE_SEARCHES,
  PRODUCTS_PUBLISHED,
  PRODUCTS_SOLD,
  PROFILE_ACCOUNT,
  PROFILE_INFO,
  PROFILE_VALUES,
  PURCHASES_COMPLETED,
  PURCHASES_ONGOING,
  SALES_COMPLETED,
  SALES_ONGOING,
  USER_FAVORITES,
  USER_MESSAGES,
  USER_PRODUCTS,
  USER_PROFILE,
  USER_PURCHASES,
  USER_SALES,
  USER_STATS,
} from "./route-paths";

const UserPage = () => {
  return (
    //<LoginNav />
    <div>
      <div>
        <Link to={USER_PROFILE}>
          <div>
            <img></img>
            <p>Luciano C.</p>{" "}
            {/* El nombre se hace trayendo el nombre de usuario y cortando el apellido */}
          </div>
        </Link>
        <Link to={USER_PURCHASES}>Compras</Link>
        <Link to={USER_SALES}>Ventas</Link>
        <Link to={USER_PRODUCTS}>Productos</Link>
        <Link to={USER_MESSAGES}>Buzón</Link>
        <Link to={USER_FAVORITES}>Favoritos</Link>
        <Link to={USER_STATS}>Estadísticas</Link>
      </div>
      <div>
        <Routes>
          <Route path={USER_PROFILE} element={<Profile />}>
            <Route path={PROFILE_INFO} element={<ProfileInfo />} />
            <Route path={PROFILE_ACCOUNT} element={<ProfileAccount />} />
            <Route path={PROFILE_VALUES} element={<ProfileValues />} />
          </Route>

          <Route path={USER_PURCHASES} element={<Purchases />}>
            <Route path={PURCHASES_ONGOING} element={<PurchasesOnGoing />} />
            <Route
              path={PURCHASES_COMPLETED}
              element={<PurchasesCompleted />}
            />
          </Route>
          <Route path={USER_SALES} element={<Sales />}>
            <Route exact path={SALES_ONGOING} element={<SalesOnGoing />} />
            <Route exact path={SALES_COMPLETED} element={<SalesCompleted />} />
          </Route>
          <Route path={USER_PRODUCTS} element={<Products />}>
            <Route path={PRODUCTS_PUBLISHED} element={<ProductPublished />} />
            <Route path={PRODUCTS_SOLD} element={<ProductSold />} />
          </Route>

          <Route path={USER_MESSAGES} element={<Messages />} />

          <Route path={USER_FAVORITES} element={<Favorites />}>
            <Route path={FAVORITE_PRODUCTS} element={<FavoriteProducts />} />
            <Route path={FAVORITE_PROFILES} element={<FavoriteProfiles />} />
            <Route path={FAVORITE_SEARCHES} element={<FavoriteSearches />} />
          </Route>

          <Route path={USER_STATS} element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserPage;
