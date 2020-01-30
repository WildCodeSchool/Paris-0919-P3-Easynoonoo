import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './ResultCharges.css'

const ResultCharges = ({ results }) => {
    return (
        <div className='justify-content-center resultsCharges-parent'>
            <h2>Coûts mensuels</h2>
                        
            <table className="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Charges et coûts</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Salaire brut</th>
                        <td>{Math.round(results.brutMensuelFamilleA)}</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Salaire net</th>
                        <td>{Math.round(results.netMensuelFamilleA)}</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Indemnité de repas</th>
                        <td>{Math.round(results.primePanierRepasFamilleA / 12)}</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Indemnités transports</th>
                        <td>{results.remboursementMensuelTransportFamilleA}</td>                        
                    </tr>
                    <tr>
                        <th scope="row">Charges sociales</th>
                        <td>{results.chargesPatronalesFamilleA + results.chargesSalarialesFamilleA}</td>                        
                    </tr>
                    <tr>
                        <th scope="row">Coût net patronal</th>
                        <td>{results.coutPatronalFamilleA }</td>                        
                    </tr>
                </tbody>
            </table>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>                       
                        <th scope="col">AIDES</th>                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Aides</th>                       
                        <td>- {Math.round((results.cmgFamilleA + results.aidesPajeFamilleA))}</td>                        
                    </tr>
                    <tr>
                        <th scope="row">Déduction forfaitaire</th>                        
                        <td>- {Math.round(results.deductionForfaitaireChargesSocialesFamilleA)}</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Montant à payer</th>
                        <td>{Math.round(results.montantAPayerFamilleA)}</td>
                    </tr>                                      
                </tbody>
            </table>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>                       
                        <th scope="col">CREDIT</th>                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Crédit impôts</th>                       
                        <td>- {Math.round(results.creditImpotMensuelFamilleA)}</td>                        
                    </tr>
                    <tr>
                        <th scope="row">Coût réel par mois</th>                        
                        <td>{Math.round(results.montantAPayerPostCreditImpotFamilleA)}</td>
                        
                    </tr>                               
                </tbody>
            </table>



            {/* <Link to="/">
                 <p className="simFormReturn">Retour aux simulateurs</p>
            </Link> */}
        </div>
    )
}

export default ResultCharges;