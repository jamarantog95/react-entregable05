import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './estilo.css'

const PokedexInfo = () => {

    // Captura el parametro
    const { id } = useParams()

    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(URL)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))

    }, [id])

    console.log(pokemon)

    return (

        <section className='container-pokeinfo'>

            <div className="container-pokeinfo_contentOne">

                <div className="container-pokeinfo_contentImg">
                    <img className='container-pokeinfo_pokeImg' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                </div>

                <div className="container-pokeinfo_details">

                    <div className="container-pokeinfo_detHeader">
                        <h3 className={`container-pokeinfo_id color-${pokemon?.types[0].type.name}`}>#{pokemon?.id}</h3>
                        <div className='container-pokeinfo_cntname'>
                            <span className='container-pokeingo_border'></span>
                            <h3 className={`container-pokeinfo_namepoke color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
                            <span className='container-pokeingo_border'></span>
                        </div>
                        <div className="container-pokeinfo_imc">
                            <div className='container-pokeinfo_imcfeat'>
                                <span className='container-pokeinfo_title-imc'>Peso</span>
                                <span className='container-pokeinfo_value'>{pokemon?.weight}</span>
                            </div>
                            <div className='container-pokeinfo_imcfeat'>
                                <span className='container-pokeinfo_title-imc'>Altura</span>
                                <span className='container-pokeinfo_value'>{pokemon?.height}</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="container-pokeinfo_features">
                    <h4 className='container-pokeinfo_ttype'>Tipo</h4>
                    <div className='container-pokeinfo_typepokemon'>{
                        pokemon?.types.map(type => (
                            <p className={`container-pokeinfo_typepokemon-det bgcolor-${type.type.name}`} key={type.type.name}>{type.type.name}</p>
                        ))
                    }
                    </div>
                    <h4 className='container-pokeinfo_thab'>Habilities</h4>
                    <div className='container-pokeinfo_habilities'>
                        {
                            pokemon?.abilities.map(hab => (
                                <p className='container-pokeinfo_habpokemon-det' key={hab.ability.name}>{hab.ability.name}</p>
                            ))
                        }
                    </div>
                </div>

                {/* <div>
                {
                    pokemon?.stats.map(stat => (
                        <div className='' key={stat.stat.name}>
                            <p className='poke-card_label'>{stat.stat.name}</p>
                            <p className={`poke-card_number color-${pokemon?.types[0].type.name}`}>{stat.base_stat}/100</p>
                        </div>
                    ))
                }
            </div> */}

            </div>
            <div className='container-pokeinfo_contentTwo'>
                <h2 className='container-pokeinfo_title-content'>Movements</h2>
                <div className="container-pokeinfo_pokemovements">
                    {
                        pokemon?.moves.map(mov => (
                            <p className='container-pokeinfo_pokemovements-det' key={mov.move.name}>{mov.move.name}</p>
                        ))
                    }
                </div>
            </div>


        </section >
    )
}

export default PokedexInfo