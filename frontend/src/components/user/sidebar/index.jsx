import { Link } from "react-router-dom";
import { GrTag } from "react-icons/gr";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { GiShakingHands, GiPriceTag } from "react-icons/gi";
import {
  USER_FAVORITES,
  USER_MESSAGES,
  USER_PRODUCTS,
  USER_PROFILE,
  USER_PURCHASES,
  USER_SALES,
  USER_STATS,
} from "../route-paths";
import styles from "./index.module.css";
import stylesDark from "./indexDark.module.css";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";

const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { userData } = useContext(AuthContext);
  if (!userData) return null;

  return (
    <div className={darkMode ? stylesDark.sideBar : styles.sideBar}>
      <div className={darkMode ? stylesDark.profileLink : styles.profileLink}>
        <Link to={USER_PROFILE}>
          <img src={userData.photo} />
          <p>{userData.name}</p>
        </Link>
      </div>
      <Link to={USER_PURCHASES}>
        <GiShakingHands /> Compras
      </Link>
      <Link to={USER_SALES}>
        <GiPriceTag /> Ventas
      </Link>
      <Link to={USER_PRODUCTS}>
        <GrTag /> Productos
      </Link>
      <Link to={USER_MESSAGES}>
        <TbMessages /> Buzón
      </Link>
      <Link to={USER_FAVORITES}>
        <MdOutlineFavoriteBorder /> Favoritos
      </Link>
      {/* <Link to={USER_STATS}>
        <IoStatsChart /> Estadísticas
      </Link> */}
    </div>
  );
};

export default Sidebar;
