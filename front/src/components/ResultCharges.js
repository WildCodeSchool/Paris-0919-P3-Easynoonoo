import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './ResultCharges.css'

const ResultCharges = ({ results }) => {
    return (
        <div className='justify-content-center resultsCharges-parent'>

            <h2>Coûts mensuels</h2>

            <h3>Coûts et charges</h3>
            <div className='lineTable'>

                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Salaire brut</div>
                    <div className='col-4 d-flex justify-content-end'>{Math.ceil(results.brutMensuelFamilleA * 100) / 100}</div>
                </div>
            </div>
            <div className='lineTable'>
                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Salaire net</div>
                    <div className='col-4 d-flex justify-content-end'>{Math.ceil(results.netMensuelFamilleA * 100) / 100}</div>
                </div>
            </div>
            <div className='lineTable'>
                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Indemnité de repas</div>
                    <div className='col-4 d-flex justify-content-end'>{Math.ceil((results.primePanierRepasFamilleA / 12) * 100) / 100}</div>
                </div>
            </div>
            <div className='lineTable'>
                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Charges sociales</div>
                    <div className='col-4 d-flex justify-content-end'>{Math.ceil(((results.chargesPatronalesFamilleA + results.chargesSalarialesFamilleA * 12)) * 100) / 100}</div>
                </div>
            </div>
            <div className='lineTable'>
                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Coût net patronal</div>
                    <div className='col-4 d-flex justify-content-end'>{results.coutPatronalFamilleA}</div>
                </div>
            </div>

            <h3>Aides</h3>
            <div className='lineTable'>
                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Aides</div>
                    <div className='col-4 d-flex justify-content-end'>{results.cmgFamilleA + results.aidesPajeFamilleA}</div>
                </div>
            </div>
            <div className='lineTable'>
                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Déduction forfaitaire</div>
                    <div className='col-4 d-flex justify-content-end'>{results.deductionForfaitaireChargesSocialesFamilleA}</div>
                </div>
            </div>
            <div className='lineTable'>
                <div id='highlightedResult' className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Montant à payer</div>
                    <div className='col-4 d-flex justify-content-end'>{Math.ceil(results.montantAPayerFamilleA * 100) / 100}</div>
                </div>
            </div>

            <h3>Crédit</h3>
            <div className='lineTable'>
                <div className='row d-flex justify-content-between inputTable'>
                    <div className='col-4'>Crédit d'impôts</div>
                    <div className='col-4 d-flex justify-content-end'>{results.creditImpotMensuelFamilleA}</div>
                </div>
            </div>
            <div className='lineTable'>
                <div id='highlightedResult' className='row d-flex justify-content-between inputTable '>
                    <div className='col-4'>Coût réel par mois</div>
                    <div className='col-4 d-flex justify-content-end'>{Math.ceil(results.montantAPayerPostCreditImpotFamilleA * 100) / 100}</div>
                </div>
            </div>


            <Link to="/">
                 <p className="simFormReturn">Retour aux simulateurs</p>
            </Link> 
            
        </div>
    )
}

export default ResultCharges;