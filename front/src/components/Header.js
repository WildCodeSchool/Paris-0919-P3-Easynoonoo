import React from 'react'
import './Header.css'
import logo from '../assets/noonoo2.svg'

const Header = () => {

    return (
        <div className ='container-fluid headerWebsite'>
            <nav className ='row justify-content-center navbarWebsite' >
                <div className='col-10'>
                    <img className ='headerLogo' src ={logo} alt = 'logo' />
                </div>                                
                {/* <input type='button' value = 'Connexion'/> */}
            </nav>            
        </div>
    )
}


export default Header