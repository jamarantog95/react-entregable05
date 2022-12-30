import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import '../components/styles/home.css'

const Home = () => {

    // Despacha las actions para que se ejecuten
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value = ''

        //Indica la ruta de destino solo si ingresamos datos
        navigate('/pokedex')
    }

    return (
        <>
            <section className='home-container'>

                <div className="home-container_main">
                    <img className='home-container_logo' src="/Home/pokedex.png" alt="" />
                    <h1 className='home-container_greetparti'>¡Hi trainer!</h1>
                    <p className='home-container_greetpartii'>Give me your name to start</p>

                    <form className='home-container_start' onSubmit={handleSubmit}>
                        <input className='home-container_inputName' id='name' type="text" placeholder='Your name..' />
                        <button className='home-container_btnStart'>Start</button>
                    </form>
                </div>

            </section>

            <footer className='footer'>
                <div className="footer_black">

                </div>
                <div className="footer_circle"></div>
            </footer>
        </>

    )
}

export default Home