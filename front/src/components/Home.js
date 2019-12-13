import React from 'react'
import Header from './Header'
import contract from '../../src/assets/contract.png'
import money2 from '../../src/assets/money2.png'
import calendar from '../../src/assets/calendar.png'
import './Home.css'

const Home = () => {

    return (
        <div className='Homepage'>

            {/* Description */}

            <article className='description'>
                <div className='vision'>
                    <h2>Notre vision</h2>
                    <p>
                        Les parents font appel à des nounous pour garder leurs enfants, pas pour être employeur. Notre plateforme est là pour sécuriser et simplifier le rôle d'employeur et se concentrer sur ce qui compte: les enfants.
                    </p>
                </div>

                <div className='mission'>
                    <h2>Notre mission</h2>
                    <p>
                        Fournir tous les outils nécessaire aux parents pour gérer administrativement la nounou, de la rédaction à la rupture du contrat, dans un environnement simple et avec le minimun d'interaction de leur part. Les parents emploient une nounou pour se faciliter la vie, nous les aidons à atteindre à cet objectif.
                    </p>
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
                    <input type='button' className='simulateurbtn' value='Essayer' />
                </div>
                
                <div className='simulateurDescription' id ='simuDesc2'>
                    <h3>Calculer les coûts de ma nounou</h3>
                    <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant" </p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>                
                    <input type='button' id='simulateurBtn2' className='simulateurbtn' value='Essayer' />
                </div>                        
            </div>

        </div>
    )
}


export default Home