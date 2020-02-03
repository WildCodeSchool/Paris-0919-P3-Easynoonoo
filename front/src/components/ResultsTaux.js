import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './ResultsTaux.css'

const ResultsTaux = ({ data }) => {
    console.log('Taux répartition', data)
    /*Here to send the values to the local storage (needed for calculs)  */
    const [tauxRepartition, setTauxRepartition] = useState([data])
    const [heuresHebdo, setHeuresHebdo] = useState([])

    useEffect(() => {
        window.localStorage.setItem('heuresHebdo', JSON.stringify([]))
        window.localStorage.setItem('tauxRepartition', JSON.stringify([]))
    }, [heuresHebdo, tauxRepartition]) //callback run if only the answers change

    

    return (

        <div className='resultsTauxParents container-fluid'>
            <div className='tauxRepartitionBloc row d-flex flex-column justify-content-center align-items-center wrap'>
                <h2 >Mon taux de répartition</h2>
                <p>{tauxRepartition}%</p>
            </div>

            <div className='row justify-content-end'>
                <Link to="/simform">
                    <button
                        className="btn btn-outline-secondary buttonTaux"
                        type="button"
                        id="button-addon2"

                    >
                        Continuer vers le calcul des charges ?
                  </button>
                </Link>


            </div>

            <Link to="/">
                <p
                    className="btn btn-link backToHomepage "

                >
                    Retour à l'écran principal
				</p>
            </Link>


        </div>
    )
}

export default ResultsTaux;