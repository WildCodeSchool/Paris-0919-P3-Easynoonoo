import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './ResultsTaux.css'





const ResultsTaux = () => {

    /*Here to send the values to the local storage (needed for calculs)  */
    const [tauxRepartition, setTauxRepartition] = useState([])
    const [heuresHebdo, setHeuresHebdo] = useState([])

    useEffect(() => {
        window.localStorage.setItem('heuresHebdo', JSON.stringify([]))
    }, [heuresHebdo, tauxRepartition]) //callback run if only the answers change


    return (
        <div className='resultsTauxParents container-fluid'>
            <div className='tauxRepartitionBloc row d-flex flex-column justify-content-center align-items-center wrap'>
                <h2 >Mon taux de répartition</h2>
                <p> %</p>
            </div>

            <div className='row justify-content-end'>
                <button
                    className="btn btn-outline-secondary buttonTaux"
                    type="button"
                    id="button-addon2"

                >
                    Continuer vers le calcul des charges ?
                  </button>


            </div>

            {/* <Link to="/">
                <p
                    class="btn btn-link"
                    onMouseDown={() => this.resetCalendar()}
                >
                    Retour aux simulateurs
				</p>
            </Link> */}


        </div>
    )
}

export default ResultsTaux;