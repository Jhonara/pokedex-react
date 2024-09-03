import React, { useEffect, useState } from 'react'
import css from "./card.module.scss"
import axios from 'axios'
import { URL_ESPECIES, URL_POKEMON } from '../../../api/apiRest'

export const Card = ({card}) => {

  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});

  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`) 
      setItemPokemon(api.data)

    }
    dataPokemon();
  }, [])

      

    useEffect(() => {
    const dataEspecie = async () => {
      const URL = card.url.split("/");
      const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`) 
      setEspeciePokemon(api.data)
      
    }
    dataEspecie();
  }, [])
  
  console.log(itemPokemon?.stats); 

  return (
    <div className={css.card} >
      <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt="pokemon" />
        <div className={`bg-${especiePokemon?.color?.name} ${css.sub_card}` }>
          <strong className={css.id_card}>001</strong>
          <strong className={css.name_card}>name</strong>
          <h4 className={css.altura_poke}>10cm</h4>
          <h4 className={css.peso_poke}>peso</h4>
          <h4 className={css.habitat_poke}>Habitat</h4>
        </div>
        <div>
          {itemPokemon?.stats?.map((sta, index) => {
            return( <h6></h6>
            )            
          })}          
        </div>
    </div>
  )
}
