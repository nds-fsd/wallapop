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
import image from "../../../assets/images/pexels-pixabay-415829.jpg";
import { getUserData } from "../../../utils/localStorage.utils";

const Sidebar = () => {

  const userData = getUserData();
  return (
    <div className={styles.sideBar}>
      <Link to={USER_PROFILE}>
        <div className={styles.profileLink}>
          <img src={image} />
          <p>{userData.name}</p>
        </div>
      </Link>
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
      <Link to={USER_STATS}>
        <IoStatsChart /> Estadísticas
      </Link>
    </div>
  );
};

export default Sidebar;
