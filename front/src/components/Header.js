import React from 'react'
import './Header.css'

const Header = () => {

    return (
        <div className ='headerWebsite'>
            <nav className ='navbarWebsite' >
                <div>
                    <h2>Easynoonoo</h2>
                </div>                                
                <input type='button' value = 'Connexion'/>
            </nav>            
        </div>
    )
}


export default Header