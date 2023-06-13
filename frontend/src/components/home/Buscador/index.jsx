import { NavLink } from "react-router-dom";
import style from "./index.module.css";
import { useState } from "react";

const Buscador = () => {
  const [search, setSearch] = useState("");

  return (
    <form className={style.searchContainer}>
      <input
        type="text"
        name="search"
        placeholder="Buscar en todas las categorias"
        autoComplete="off"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      ></input>
      <NavLink to={`/category/product/search/${search}`}>
        <button type="submit" className="boton">Buscar</button>
      </NavLink>
    </form>
  );
};
export default Buscador;
