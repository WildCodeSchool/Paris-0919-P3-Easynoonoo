import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './ResultCharges.css'

const ResultCharges = ({ results }) => {
    return (
        <div className='justify-content-center resultsCharges-parent'>
            
            <div className="table-responsive">
                <table className="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" className="testJ">COÛTS</th>
                            <th scope="col"></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Salaire brut</th>
                            <td className="testJ">{Math.ceil(results.brutMensuelFamilleA*100)/100}</td>
                            <td className="testJ">{Math.ceil(results.brutAnnuelFamilleA*100)/100}</td>
                            
                        </tr>
                        <tr>
                            <th scope="row">Salaire net</th>
                            <td className="testJ">{Math.ceil(results.netMensuelFamilleA*100)/100}</td>
                            <td className="testJ">{Math.ceil((results.netMensuelFamilleA*100*12))/100}</td>
                            
                        </tr>
                        <tr>
                            <th scope="row">Indemnité de repas</th>
                            <td className="testJ">{Math.ceil((results.primePanierRepasFamilleA/12)*100)/100}</td>
                            <td className="testJ">{Math.ceil((results.primePanierRepasFamilleA)*100)/100}</td>
                        </tr>
                        <tr>
                            <th scope="row">Charges sociales</th>
                            <td className="testJ">{Math.ceil((results.chargesPatronalesFamilleA + results.chargesSalarialesFamilleA)*100)/100}</td>
                            <td className="testJ">{Math.ceil(((results.chargesPatronalesFamilleA + results.chargesSalarialesFamilleA*12))*100)/100}</td>
                        </tr>
                        <tr>
                            <th scope="row">Coût net patronal</th>
                            <td className="testJ">{results.coutPatronalFamilleA}</td>
                            <td className="testJ">{results.coutPatronalFamilleA*12}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="table-responsive">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col thTitle" className="testJ">AIDES</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Aides</th>
                            <td className="testJ">- {results.cmgFamilleA + results.aidesPajeFamilleA}</td>
                            <td className="testJ">- {(results.cmgFamilleA + results.aidesPajeFamilleA)*12}</td>
                        </tr>
                        <tr>
                            <th scope="row">Déduction forfaitaire</th>
                            <td className="testJ">- {results.deductionForfaitaireChargesSocialesFamilleA}</td>
                            <td className="testJ">- {results.deductionForfaitaireChargesSocialesFamilleA*12}</td>

                        </tr>
                        <tr>
                            <th scope="row">Montant à payer</th>
                            <td className="testJ">{Math.ceil(results.montantAPayerFamilleA*100)/100}</td>
                            <td className="testJ">{Math.ceil((results.montantAPayerFamilleA*12)*100)/100}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="table-responsive">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" className="testJ">CREDIT</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Crédit impôts</th>
                            <td className="testJ">- {results.creditImpotMensuelFamilleA}</td>
                            <td className="testJ">- {results.creditImpotAnnuelFamilleA}</td>
                        </tr>
                        <tr>
                            <th scope="row">Coût réel </th>
                            <td className='highlightedInfos testJ'>{Math.ceil(results.montantAPayerPostCreditImpotFamilleA*100)/100}</td>
                            <td className='highlightedInfos testJ'>{Math.ceil((results.montantAPayerPostCreditImpotFamilleA*12)*100)/100}</td>

                        </tr>
                    </tbody>
                </table>
            </div>








            {/* <Link to="/">
                 <p className="simFormReturn">Retour aux simulateurs</p>
            </Link> */}
        </div>
    )
}

export default ResultCharges;