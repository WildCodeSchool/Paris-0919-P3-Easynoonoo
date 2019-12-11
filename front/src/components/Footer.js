import React from 'react'
import './Footer.css'

const Footer = () => {

    return (
        <div >
            <footer className ='footerWebsite'>
                <div className='footerInfos'>
                    <h4>Easynoonoo</h4>
                    <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant" </p>
                </div>
                <div className ='footerLink'>
                    <div className='footerElements'>
                        <p>Link </p>
                        <p>Link </p>
                        <p>Link </p>
                        <p>Link </p>
                    </div>
                    <div className='footerElements'>
                        <p>Link </p>
                        <p>Link </p>
                        <p>Link </p>                        
                        <p>Mentions légales</p>
                    </div>      
                    <div className='footerElements'>
                        <p>Contact</p>
                        <p>Réseaux sociaux</p>
                    </div>              
                </div>
                                         
            </footer>            
        </div>
    )
}


export default Footer
