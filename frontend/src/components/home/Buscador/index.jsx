import { useState } from "react";

const Buscador = () => {
    const[search,setSearch] = useState('');

    if(search === 'reset') setSearch('')

    return (
        <form>
                <input 
                type='text' 
                name='search' 
                autoComplete='off'
                value={search}
                onChange={ev => setSearch(ev.target.value)}
                ></input>
                <button type='submit'>Buscar</button>
                <p>Resultados para: {search}</p>
        </form>
    );
};
export default Buscador