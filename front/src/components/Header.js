import React from 'react'
import './Header.css'
import logo from '../assets/noonoo2.svg'

const Header = () => {

    return (
        <div className='container-fluid headerWebsite'>
            <nav className='row justify-content-between navbarWebsite' >
                <div className='col-5 d-flex justify-content-around'>
                    <img className='headerLogo' src={logo} alt='logo' />
                    <div className='row d-flex justify-content-center align-items-center'>
                        <p>Produits</p>
                        <p>Simulateurs</p>
                        <p>Tarifs</p>
                    </div>

                </div>
                 <div className='col-5 d-flex justify-content-end align-items-center endNavbar'>
                     <p>Se connecter</p> 
                    <button
                        className="btn btn-outline-secondary buttonPlanning"
                        type="button"
                        id="button-addon2"
                    >
                        Demander une démo
                    </button>
                </div> 
                {/* <input type='button' value = 'Connexion'/> */}
            </nav>
        </div>
    )
}


export default Header