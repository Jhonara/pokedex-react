import React, { useEffect, useState } from 'react'
import css from "./card.module.scss"
import axios from 'axios'
import { URL_ESPECIES, URL_EVOLUCIONES, URL_POKEMON } from '../../../api/apiRest'

export const Card = ({ card }) => {

  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});
  const [evoluciones, setEvoluciones] = useState([]);

  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`)
      setItemPokemon(api.data)

    }
    dataPokemon();
  }, [card])

  useEffect(() => {
    const dataEspecie = async () => {
      const URL = card.url.split("/");
      const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`)
      setEspeciePokemon({
        url_especie: api?.data?.evolution_chain,
        data: api?.data
      })
    }
    dataEspecie();
  }, [card])

  useEffect(() => {

    async function getPokemonImagen(id) {
      const response = await axios.get(`${URL_POKEMON}/${id}`)
      return response?.data?.sprites?.other["official-artwork"]?.front_default;
    }    
    if (especiePokemon?.url_especie) {      
      const obtenerEvoluciones = async () => {
        const arrayEvoluciones = []
        const URL = especiePokemon?.url_especie?.url.split("/");
        const api = await axios.get(`${URL_EVOLUCIONES}/${URL[6]}`);
        const URL2 = api?.data?.chain?.species?.url?.split("/");
        const img1 = await getPokemonImagen(URL2[6])        
        arrayEvoluciones.push({
          img: img1,
          name: api?.data?.chain?.species?.name,
        })

        if (api?.data?.chain?.evolves_to?.length !== 0) {

          const DATA2 = api?.data?.chain?.evolves_to[0]?.species
          const ID = DATA2?.url?.split("/");
          const img2 = await getPokemonImagen(ID[6]);
          arrayEvoluciones.push({
            img: img2,
            name: DATA2?.name,
          })
        

        if (api?.data?.chain?.evolves_to[0].evolves_to.length !== 0) {
        
          const DATA3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species
          const ID = DATA3?.url?.split("/");
          const img3 = await getPokemonImagen(ID[6]);
          arrayEvoluciones.push({
            img: img3,
            name: DATA3?.name,
          })
        }
      }

        setEvoluciones(arrayEvoluciones);
      };
      obtenerEvoluciones();
    }
  }, [especiePokemon]);


  let pokeId = itemPokemon?.id?.toString();
  if (pokeId?.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId?.length === 2) {
    pokeId = "0" + pokeId;
  }

  return (
    <div className={css.card} >
      <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt="pokemon" />
      <div className={`bg-${especiePokemon?.data?.color?.name} ${css.sub_card}`}>
        <strong className={css.id_card}>#{pokeId}</strong>
        <strong className={css.name_card}>{itemPokemon?.name}</strong>
        <h4 className={css.altura_poke}>Altura: {itemPokemon?.height}0 cm</h4>
        <h4 className={css.peso_poke}>Peso: {itemPokemon?.weight} Kg</h4>
        <h4 className={css.habitat_poke}>Habitat: {especiePokemon?.data?.habitat?.name}</h4>
        <div className={css.div_stats}>
          {itemPokemon?.stats?.map((sta, index) => {
            return <h6 className={css.item_stats} key={index}>
              <span className={css.name}>{sta?.stat?.name} </span>
              <progress className={css.base_stats} value={sta?.base_stat} max={110}></progress>
              <span className={css.numero} >{sta?.base_stat} </span>
            </h6>;
          })}
        </div>
        <div className={css.div_type_color}>
          {itemPokemon?.types?.map((ti, index) => {
            return (
              <h6 className={`color-${ti.type.name} ${css.color_type}`} key={index}>{ti.type.name}</h6>
            )
          })}
        </div>
        <div className={css.div_evolucion}>
          {evoluciones.map((evo, index ) =>{
            return(
              <div key={index} className={css.item_evo}>
                <img className={css.img} src={evo.img} alt="Evolucion" />
                <h6>{evo.name}</h6>
              </div> 
            )
          })}
        </div>
      </div>
    </div>
  )
}
