import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import PurchasesOnGoing from "./purchases/PurchasesOnGoing";
import PurchasesCompleted from "./purchases/PurchasesCompleted";
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
  STATS_PURCHASES,
  STATS_SALES,
  USER,
  USER_FAVORITES,
  USER_MESSAGES,
  USER_PRODUCTS,
  USER_PROFILE,
  USER_PURCHASES,
  USER_SALES,
  USER_STATS,
} from "./route-paths";
import styles from "./index.module.css";
import Sidebar from "./sidebar";
import ChatRoom from "../chat/chat-room";
import Stats from "./stats";
import StatsPurchases from "./stats/StatsPurchases";
import StatsSales from "./stats/StatsSales";

const UserPage = () => {
  return (
    <div className={styles.userPageContainer}>
      <Sidebar />
      <div className={styles.outletContainer}>
        <Routes>
          <Route path={USER_PROFILE} element={<Profile />}>
            <Route path="" element={<ProfileInfo />} />
            <Route path={PROFILE_INFO} element={<ProfileInfo />} />
            <Route path={PROFILE_ACCOUNT} element={<ProfileAccount />} />
            {/* <Route path={PROFILE_VALUES} element={<ProfileValues />} /> */}
          </Route>

          <Route path={USER_PURCHASES} element={<Purchases />}>
            <Route path="" element={<PurchasesCompleted />} />
          </Route>

          <Route path={USER_SALES} element={<Sales />}>
            <Route path="" element={<SalesCompleted />} />
          </Route>

          <Route path={USER_PRODUCTS} element={<Products />}>
            <Route path="" element={<ProductPublished />} />
            <Route path={PRODUCTS_PUBLISHED} element={<ProductPublished />} />
            <Route path={PRODUCTS_SOLD} element={<ProductSold />} />
          </Route>

          <Route path={USER_MESSAGES} element={<Messages />}>
            <Route path="chatroom/:chatRoomID" element={<ChatRoom />} />
          </Route>

          <Route path={USER_FAVORITES} element={<Favorites />}>
            <Route path="" element={<FavoriteProducts />} />
            {/* <Route path={FAVORITE_SEARCHES} element={<FavoriteSearches />} /> */}
          </Route>

          {/* <Route path={USER_STATS} element={<Stats />}>
            <Route path="" element={<Statistics />} />
          </Route> */}

          <Route path={USER_STATS} element={<Stats />}>
            <Route path="" element={<StatsPurchases />} />
            <Route path={STATS_PURCHASES} element={<StatsPurchases />} />
            <Route path={STATS_SALES} element={<StatsSales />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default UserPage;
