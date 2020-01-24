import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import './ResultCharges.css'

const ResultCharges = () => {
    return (
        <div className='container-fluid'>
            <p>MAQUETTE</p>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ma part</th>
                        <th scope="col">Total</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Salaire perçu par la nounou</th>
                        <td></td>
                        <td></td>                        
                    </tr>
                    <tr>
                        <th scope="row">Mon coût mensuel</th>
                        <td></td>                       
                    </tr>                    
                </tbody>
            </table>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Heure</th>
                        <th scope="col">Mois</th>  
                        <th scope="col">Année</th>                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Salaire brut</th>
                        <td></td>
                        <td></td>
                        <td></td>                        
                    </tr>
                    <tr>
                        <th scope="row">Salaire net</th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Coût net de crédit et aides</th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Coût</th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Salaire</th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Repas</th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Transports</th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Charges patronales</th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Crédits</th>
                        <td></td>
                        <td></td>
                        <td></td>                                            
                    </tr>
                    <tr>
                        <th scope="row">Déduction forfaitaire des charges</th>
                        <td></td>
                        <td></td>
                        <td></td>                                            
                    </tr>
                    <tr>
                        <th scope="row">Aide Paje pour les charges</th>
                        <td></td>
                        <td></td>
                        <td></td>                                            
                    </tr>
                    <tr>
                        <th scope="row">CMG</th>
                        <td></td>
                        <td></td>
                        <td></td>                                            
                    </tr>
                    <tr>
                        <th scope="row">Aides additionnelles</th>
                        <td></td>
                        <td></td>
                        <td></td>                                            
                    </tr>
                    <tr>
                        <th scope="row">Crédit d'impôts</th>
                        <td></td>
                        <td></td>
                        <td></td>                                            
                    </tr>
                </tbody>
            </table>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Hypothèses modifiables</th>
                        <th scope="col"></th>
                                               
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Panier repas</th>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Nb jours travaillés par semaine</th>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Abonnement transports publics</th>
                        <td></td>                       
                    </tr> 
                    <tr>
                        <th scope="row"></th>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Part garde</th>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">1ère année d'emploi d'un salarié à domicile</th>
                        <td></td>                       
                    </tr> 
                    <tr>
                        <th scope="row">Garde alternée</th>
                        <td></td>                       
                    </tr>                   
                </tbody>
            </table>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Heures</th>
                                                
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Totales</th>
                        <td></td>                        
                    </tr>
                    <tr>
                        <th scope="row">Normales</th>
                        <td></td>                       
                    </tr> 
                    <tr>
                        <th scope="row">Dont présence responsable</th>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Supplémentaires</th>
                        <td></td>                       
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