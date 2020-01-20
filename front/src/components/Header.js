import React from 'react'
import './Header.css'
import logo from '../assets/noonoo2.svg'

const Header = () => {

    return (
        <div className ='container headerWebsite'>
            <nav className ='navbarWebsite' >
                <div>
                    <img className ='headerLogo' src ={logo} alt = 'logo' />
                </div>                                
                <input type='button' value = 'Connexion'/>
            </nav>            
        </div>
    )
}


export default Header