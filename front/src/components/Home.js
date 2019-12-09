import React from 'react'
import Header from './Header'
import './Home.css'

const Home = () => {

    return (
        <div className ='Homepage'>
            <Header/>
            <article className='description'>
                <div className='vision'>
                    <h2>Notre vision</h2>
                        <p>
                        Les parents font appel à des nounous pour garder leurs enfants, pas pour être employeur. Notre plateforme est là pour sécuriser et simplifier le rôle d'employeur et se concentrer sur ce qui compte: les enfants.
                        </p>
                <div className='mission'>
                    <h2>Notre mission</h2>
                        <p>
                        Fournir tous les outils nécessaire aux parents pour gérer administrativement la nounou, de la rédaction à la rupture du contrat, dans un environnement simple et avec le minimun d'interaction de leur part. Les parents emploient une nounou pour se faciliter la vie, nous les aidons à atteindre à cet objectif.
                        </p>
                </div>
                </div>
            </article>

            <img className='screenshot' src='' alt=''>
            </img>
        </div>
    )
}


export default Home