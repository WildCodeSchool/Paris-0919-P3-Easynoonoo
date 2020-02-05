import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './ResultsTaux.css'

const ResultsTaux = ({ data }) => {


    return (

        <div className='resultsTauxParents container-fluid'>
            <div className='tauxRepartitionBloc row d-flex flex-column justify-content-center align-items-center wrap'>
                <h2 >Mon taux de répartition</h2>
                <p>{data.RepartitionA} %</p>


            </div>
            <div className='errorMessageOutRange'>
                {data.hourOutOfRangeA > 0 ? <p> Merci de vérifier les horaires de votre rythme, la durée hebdomadaire de votre nounou dépasse le maximal légal (à savoir 50h) de {data.hourOutOfRangeA}h.</p> : ''}
                {data.hourOutOfRangeB > 0 ? <p> Merci de vérifier les horaires du rythme de la co-famille, la durée hebdomadaire de la nounou dépasse le maximal légal (à savoir 50h) de {data.hourOutOfRangeB}h. </p> : ''}
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