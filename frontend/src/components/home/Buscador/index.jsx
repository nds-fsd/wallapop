import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import stylesDark from ".//indexDark.module.css";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";

const Buscador = () => {
  const [search, setSearch] = useState("");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <form
      className={darkMode ? stylesDark.searchContainer : styles.searchContainer}
    >
      <input
        type="text"
        name="search"
        placeholder="Buscar en todas las categorias"
        autoComplete="off"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      ></input>
      <NavLink to={`/category/product/search/${search}`}>
        <button type="submit">Buscar</button>
      </NavLink>
    </form>
  );
};
export default Buscador;
