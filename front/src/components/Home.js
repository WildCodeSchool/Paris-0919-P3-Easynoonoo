import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import contract from '../../src/assets/contract.png'
import money2 from '../../src/assets/money2.png'
import calendar from '../../src/assets/calendar.png'
import logo from '../../src/assets/red.png'
import Simform from './SimForm'
import FamilyForm from './FamilyForm'
import './Home.css'

const Home = () => {

    return (
        <div className='Homepage'>

            {/* Description */}

            <article className='articleDescription'>
                <div className='articleVision'>
                    <h2>Notre vision</h2>
                    <p>Les parents font appel à des nounous pour garder leurs enfants, pas pour être employeur.</p>
                    <p> Notre plateforme est là pour sécuriser et simplifier le rôle d'employeur et se concentrer sur ce qui compte: les enfants.</p>
                </div>

                {/* <div className='testhover'><p>hello</p></div> */}

                <div className='articleMission'>
                    <div className='logo'>
                    <h2>Easynoonoo</h2>
                    <img className='placeholderLogo' src={logo} alt='placeholder for easynoonoo logo'></img>
                    </div> 
                </div>
            </article>


            {/* Teaser/ Screenshots from app */}

            <h2 className ='h2Teaser'>Notre solution</h2>

            <div className='screen'>
                <img className='screenshot1' src='https://via.placeholder.com/800x500/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                </img>
                <div className='desc'>
                    <h3>Lorem.</h3>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>
                    <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant"
                    </p>
                </div>
            </div>


            <div className='screen' id='screen2Bg'>
                <div className='desc' id='descColor'>
                    <h3 id='h3Color'> Lorem.</h3>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
                    </p>
                    <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est "
                    </p>
                </div>
                
                <img className='screenshot2' src='https://via.placeholder.com/800x500/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                    </img>                    
                
                
            </div> 


            {/* SIMULATEUR */}

            <h2 className ='h2Simulateur'>Essayer nos simulateurs </h2>

            <div className='simulateur'>   

                <div className='simulateurDescription'>
                    <h3>Calculer mon taux de répartition</h3>
                    <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant" </p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>                
                    <Link to='/familyform'><input type='button' className='simulateurbtn' value='Essayer' /></Link>
                </div>
                
                <div className='simulateurDescription' id ='simuDesc2'>
                    <h3>Calculer les coûts de ma nounou</h3>
                    <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant" </p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>                
                    <Link to='/simform'><input type='button' id='simulateurBtn2' className='simulateurbtn' value='Essayer' /></Link>
                </div>                        
            </div>

        </div>
    )
}


export default Home