import React from 'react'
import './Header.css'
import logo from '../assets/noonoo2.svg'

const Header = () => {

    return (
        <div className='container-fluid headerWebsite'>
            <nav className='row justify-content-between navbarWebsite' >
                <div className='col-8 d-flex'>
                    <img className='headerLogo' src={logo} alt='logo' />
                    {/* <p>Produits</p>
                    <p>Simulateurs</p>
                    <p>Tarifs</p> */}
                </div>
                <div className='col-4 d-flex justify-content-end align-items-center'>
                    {/* <p>Se connecter</p> */}
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