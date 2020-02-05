import React from 'react'
import './Footer.css'

const Footer = () => {

    return (
        <div >
            <footer className ='footerWebsite'>
                <div className='footerInfos'>
                    <h4>Easynoonoo</h4>
                </div>
                <div className ='footerLink'>
                    <div className='footerElements'>
                        <p>A propos</p>
                        <p>Notre mission</p>
                        <p>Accompagnement</p>
                        <p>On recrute</p>
                    </div>
                    <div className='footerElements'>
                        <p>Mentions</p>
                        <p>CGU</p>
                        <p>Mentions légales</p>                        
                        <p>RGPD</p>
                        <p>Cookies</p>
                        <p>Statut</p>
                    </div>      
                    <div className='footerElements'>
                        <p>Réseaux sociaux</p>
                    </div>              
                </div>
                                         
            </footer>            
        </div>
    )
}


export default Footer
