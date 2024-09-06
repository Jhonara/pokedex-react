import React, { useEffect, useState } from 'react';
import css from './layout.module.scss';
import { Header } from '../header/Header';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { URL_POKEMON } from "../../../api/apiRest";
import { Card } from '../card/Card';

export const LayoutHome = () => {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const limit = 15; 

  useEffect(() => {
    const api = async () => {
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xp}&limit=${limit}`);
      setArrayPokemon(apiPoke.data.results);
    }
    api();
    getGlobalPokemons();
  }, [xpage]);

  const getGlobalPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1025`);
    const promises = res.data.results.map((pokemon) =>{
      return pokemon;
    });
    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  const totalPages = Math.ceil(globalPokemon.length / limit);

  const filterPokemon = search?.length > 0
  ? globalPokemon?.filter(pokemon => pokemon?.name?.includes(search))
  : arrayPokemon
  
  const obtenerSearch = (e) => {
    const texto = e.toLowerCase()    
    setSearch(texto);
    setXpage(1)
  }

  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch} />
      <section className={css.section_paginacion}>
        <div className={css.div_paginacion}>
          <span className={css.item_izq}
            onClick={() => {
              if (xpage === 1) {
                return console.log("Primera página");
              }
              setXpage(xpage - 1);
            }}
          ><FaIcons.FaAngleLeft /></span>
          <span className={css.item}>{xpage}</span>
          <span className={css.item}> De </span>
          <span className={css.item}>{totalPages}</span>
          <span className={css.item_der}
            onClick={() => {
              if (xpage === totalPages) {
                return console.log("Última página");
              }
              setXpage(xpage + 1);
            }}
          ><FaIcons.FaAngleRight /> </span>
        </div>
      </section>
      <div className={css.card_content}>
        {filterPokemon.map((card, index) => {
          return <Card key={index} card={card} />
        })}
      </div>
    </div>
  );
};
