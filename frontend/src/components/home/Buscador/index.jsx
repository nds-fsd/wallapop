import { useState } from "react";
import style from "./index.module.css";

const Buscador = () => {
  const [search, setSearch] = useState("");

  if (search === "reset") setSearch("");

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
      <button type="submit">BUSCAR</button>
    </form>
  );
};
export default Buscador;
