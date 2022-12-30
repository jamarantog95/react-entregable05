import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokeCard from '../components/Pokedex/PokeCard'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import '../components/styles/pokedex.css'
import ErrorFetch from '../../../entregable3-gen-2/src/components/ErrorFetch'

const Pokedex = () => {

    const { trainer } = useSelector(state => state)

    const [pokemons, setPokemons] = useState()

    const [types, setTypes] = useState()

    const [typeSelected, setTypeSelected] = useState('All pokemons')


    // Api: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000000'

    useEffect(() => {
        if (typeSelected !== "All pokemons") {
            axios.get(typeSelected)
                .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
                .catch(err => console.log(err))
        } else {
            const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1400'
            axios.get(URL)
                .then(res => setPokemons(res.data.results))
                .catch(err => console.log(err))
        }
        // const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=120'
        // axios.get(URL)
        //     .then(res => setPokemons(res.data.results))
        //     .catch(err => console.log(err))
    }, [typeSelected])
    console.log(pokemons)


    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/type'
        axios.get(URL)
            .then(res => setTypes(res.data.results))
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => {
        setTypeSelected(e.target.value)
        setPage(1)
    }


    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const input = e.target.search.value.trim().toLowerCase()
        navigate(`/pokedex/${input}`)
    }



    // Paginacion
    const [page, setPage] = useState(1)
    const [pokerPerPage, setpokerPerPage] = useState(16)
    const initialPoke = (page - 1) * pokerPerPage
    const finalPoke = page * pokerPerPage
    const maxPage = pokemons && Math.ceil(pokemons.length / pokerPerPage)

    return (
        <div>
            <h2 className='text-welcome'>
                <span className='text-welcome_name_trainner'>Welcome {trainer}</span>
                <span className='text-welcome_paragraph'>, here you come find the favorite pokemon.</span>
            </h2>

            <div className="container-searchpoke">

                {/* Busqueda por input */}
                <form className='container-searchpoke_forminput' onSubmit={handleSubmit}>
                    <input className='container-searchpoke_inputpoke' id='search' type="text" placeholder='Busca un pokemon' />
                    <button className='container-searchpoke_btnsearchpoke'>Buscar</button>
                </form>

                <select className='container-searchpoke_optionpoke' onChange={handleChange}>
                    <option value="All pokemons">All pokemons</option>
                    {
                        types?.map(type => (
                            <option className='container-searchpoke_optionvalue' key={type.url} value={type.url}>{type.name}</option>
                        ))
                    }
                </select>

            </div>

            {/* <Pagination
                page={page}
                maxPage={maxPage}
                setPage={setPage}

            /> */}


            <div className="container-poke">
                {
                    pokemons?.slice(initialPoke, finalPoke).map(poke => (
                        <PokeCard
                            key={poke.url}
                            url={poke.url}
                        />
                    ))
                }
            </div>



            <Pagination
                page={page}
                maxPage={maxPage}
                setPage={setPage}

            />
        </div>
    )
}

export default Pokedex