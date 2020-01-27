import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import './SimForm.css'
import ResultCharges from './ResultCharges'
import { relativeTimeRounding } from 'moment'

const SimForm = () => {
  // initialize value to the one in the localstorage in the first render
  const initialAnswer1 = () =>
    Number(window.localStorage.getItem('heuresHebdo')) || 40
  const initialAnswer2 = () =>
    Number(window.localStorage.getItem('alsaceMoselle')) || 0
  const initialAnswer3 = () =>
    Number(window.localStorage.getItem('tauxHoraire')) || 10
  const initialAnswer4 = () =>
    window.localStorage.getItem('gardeAlternee') || false
  const initialAnswer5 = () =>
    Number(window.localStorage.getItem('repartitionFamille')) || 100
  const initialAnswer6 = () =>
    Number(window.localStorage.getItem('nbEnfants')) || 0
  const initialAnswer7 = () =>
    Number(window.localStorage.getItem('enfantPlusJeune')) || 0
  const initialAnswer8 = () =>
    Boolean(window.localStorage.getItem('parentIsole')) || false
  const initialAnswer9 = () =>
    Number(window.localStorage.getItem('ressourcesAnnuelles')) || 0

  // state en hook pour les réponses

  const [heuresHebdo, setheuresHebdo] = useState(initialAnswer1)
  const [alsaceMoselle, setalsaceMoselle] = useState(initialAnswer2)
  const [tauxHoraire, settauxHoraire] = useState(initialAnswer3)
  const [gardeAlternee, setgardeAlternee] = useState(initialAnswer4)
  const [repartitionFamille, setrepartitionFamille] = useState(
    initialAnswer5,
  )
  const [nbEnfants, setnbEnfants] = useState(initialAnswer6)
  const [enfantPlusJeune, setenfantPlusJeune] = useState(
    initialAnswer7,
  )
  const [parentIsole, setparentIsole] = useState(initialAnswer8)
  const [ressourcesAnnuelles, setressourcesAnnuelles] = useState(
    initialAnswer9,
  )


  // function to find heureSup 
  let heuresSeparees = (heureHebdo) => {
    let heureSup
    if (heureHebdo > 40) {
      heureSup = heureHebdo - 40
      return heureSup
    } else {
      heureSup = 0
      return heureSup
    }
  }

  // hooks + variables pour hypothèses de calculs

  let aujd = new Date()
  const initialAnswerPanierRepas = () =>
    Number(window.localStorage.getItem('panierRepas')) || 5
  const initialAnswersJoursTravaillesHebdo = () =>
    Number(window.localStorage.getItem('joursTravaillesSemaines')) || 5
  const initialAnswersAbonnementTransport = () =>
    Number(window.localStorage.getItem('montantAbonnementTransports')) || 75.20
  const initialAnswersPriseEnChargeAbonnement = () =>
    Number(window.localStorage.getItem('priseEnChargeAbonnement')) || 50
  const initialAnswerspremiereAnneeEmploiDomicile = () =>
    Boolean(window.localStorage.getItem('premiereAnneeEmploiDomicile')) || true
  const initialJoursCp = () =>
    Number(window.localStorage.getItem('joursCP')) || 25
  const initialJoursRecup = () =>
    Number(window.localStorage.getItem('joursRecup')) || 0


  const [requestCalcul, setRequestCalcul] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [anneeEmploi, setAnneeEmploi] = useState(initialAnswerspremiereAnneeEmploiDomicile)
  const [montantTransport, setMontantTransport] = useState(initialAnswersAbonnementTransport)
  const [partPriseCharge, setPartPriseCharge] = useState(initialAnswersPriseEnChargeAbonnement)
  const [panierRepas, setPanierRepas] = useState(initialAnswerPanierRepas)
  const [joursCP, setJoursCP] = useState(initialJoursCp)
  const [joursRecup, setJoursRecup] = useState(initialJoursRecup)
  const [joursTravaillesSemaines] = useState(initialAnswersJoursTravaillesHebdo)


  const returnBoolean = (e) => {
    if (e == "true") {
      return true
    } else {
      return false
    }
  }

  let dataObject = []

  const getData = () => {
    return (
      new Promise(resolve => {
        resolve(
          dataObject = {
            "dateDebutAnnee": aujd.getFullYear(),
            "enfantPlusJeune": enfantPlusJeune,
            "nbEnfants": nbEnfants,
            "parentsIsole": returnBoolean(parentIsole),
            "ressourcesAnnuelles": ressourcesAnnuelles,
            "heuresHebdo": heuresHebdo - heuresSeparees(heuresHebdo),
            "heuresSup": heuresSeparees(heuresHebdo),
            "heuresHebdoTotales": heuresHebdo,
            "tauxHoraire": tauxHoraire,
            "repartitionFamille": repartitionFamille / 100,
            "alsaceMoselle": alsaceMoselle,
            "montantRepas": panierRepas,
            "joursTravaillesSemaines": joursTravaillesSemaines,
            "joursCP": joursCP,
            "joursRecup": joursRecup,
            "priseEnChargeAbonnement": partPriseCharge / 100,
            "montantAbonnementTransports": montantTransport,
            "premiereAnneeEmploiDomicile": returnBoolean(anneeEmploi),
            "gardeAlternee": returnBoolean(gardeAlternee)

          }

        )
      })
    )
  }

  const sendData = () => {
    axios.post('http://localhost:4000/api/calculscharges', dataObject) //POST - POST => envoyer infos
      .then((res) => {
        console.log(res.data) //ici affiche la réponse du back (calculs)
        setRequestCalcul(res.data) // je mets les calculs dans la state
      }).catch((error) => {
        console.log(error)

      })
      
  }



  async function showData() {
    await getData();
    sendData();
    setShowResults(true)

  }

  


  //store the data in local storage
  useEffect(() => {

    console.log('ici requestCalcul',requestCalcul)


    window.localStorage.setItem('heuresHebdo', heuresHebdo)
    window.localStorage.setItem('alsaceMoselle', alsaceMoselle)
    window.localStorage.setItem('tauxHoraire', tauxHoraire)
    window.localStorage.setItem('gardeAlternee', gardeAlternee)
    window.localStorage.setItem(
      'repartitionFamille',
      repartitionFamille ,
    )
    window.localStorage.setItem('nbEnfants', nbEnfants)
    window.localStorage.setItem('enfantPlusJeune', enfantPlusJeune)
    window.localStorage.setItem('parentIsole', parentIsole)
    window.localStorage.setItem(
      'ressourcesAnnuelles', ressourcesAnnuelles,
    )
    window.localStorage.setItem('nbEnfants', nbEnfants)
  }, [
    heuresHebdo,
    alsaceMoselle,
    tauxHoraire,
    gardeAlternee,
    repartitionFamille,
    nbEnfants,
    enfantPlusJeune,
    parentIsole,
    ressourcesAnnuelles,
    requestCalcul
  ]) //callback run only the answers change

  const handleQuestion9 = () => {
    if (
      (nbEnfants == 1 && enfantPlusJeune <= 3) ||
      (nbEnfants == 1 && enfantPlusJeune >= 3)
    ) {
      return (
        <div>
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="20755">
              Inférieures ou égales à 20 755 €
            </option>
            <option value="46123">
              Supérieures à 20 755 € et inférieures ou égales à
              46 123 €
            </option>
            <option value="46124">Supérieures à 46 123 €</option>
          </select>
        </div>
      )
    } else if (
      (nbEnfants == 2 && enfantPlusJeune <= 3) ||
      (nbEnfants == 2 && enfantPlusJeune >= 3)
    ) {
      return (
        <div>
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="23701">
              Inférieures ou égales à 23 701 €
            </option>
            <option value="52670">
              Supérieures à 23 701 € et inférieures ou égales à
              52 670 €
            </option>
            <option value="52671">Supérieures à 52 670 €</option>
          </select>
        </div>
      )
    } else if (
      (nbEnfants == 3 && enfantPlusJeune <= 3) ||
      (nbEnfants == 3 && enfantPlusJeune) >= 3
    ) {
      return (
        <div>
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="26647">
              Inférieures ou égales à 26 647 €
            </option>
            <option value="59217">
              Supérieures à 26 647 € et inférieures ou égales à
              59 217 €
            </option>
            <option value="59218">Supérieures à 59 217 €</option>
          </select>
        </div>
      )
    } else if (
      (nbEnfants == 4 && enfantPlusJeune <= 3) ||
      (nbEnfants == 4 && enfantPlusJeune >= 3)
    ) {
      return (
        <div>
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="29593">
              Inférieures ou égales à 29 593 €
            </option>
            <option value="65764">
              Supérieures à 29 593 € et inférieures ou égales à
              65 764 €
            </option>
            <option value="65765">Supérieures à 65 764 €</option>
          </select>
        </div>
      )
    }
  }

  const handleQuestion9True = () => {
    if (
      (nbEnfants == 1 && enfantPlusJeune <= 3) ||
      (nbEnfants == 1 && enfantPlusJeune >= 3)
    ) {
      return (
        <div>
          
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="29057">
              Inférieures ou égales à 29 057 €
            </option>
            <option value="64572">
              Supérieures à 29 057 € et inférieures ou égales à 64
              572 €
            </option>
            <option value="64573">Supérieures à 64 572 €</option>
          </select>
        </div>
      )
    } else if (
      (nbEnfants == 2 && enfantPlusJeune <= 3) ||
      (nbEnfants == 2 && enfantPlusJeune >= 3)
    ) {
      return (
        <div>
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="33181">
              Inférieures ou égales à 33 181 €
            </option>
            <option value="73738">
              Supérieures à 33 181 € et inférieures ou égales à 73
              738 €
            </option>
            <option value="73739">Supérieures à 73 738 €</option>
          </select>
        </div>
      )
    } else if (
      (nbEnfants == 3 && enfantPlusJeune <= 3) ||
      (nbEnfants == 3 && enfantPlusJeune) >= 3
    ) {
      return (
        <div>
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="37306">
              Inférieures ou égales à 37 306 €
            </option>
            <option value="82904">
              Supérieures à 37 306 € et inférieures ou égales à 82
              904 €
            </option>
            <option value="82905">Supérieures à 82 904 €</option>
          </select>
        </div>
      )
    } else if (
      (nbEnfants == 4 && enfantPlusJeune <= 3) ||
      (nbEnfants == 4 && enfantPlusJeune >= 3)
    ) {
      return (
        <div>
          <select class="form-control">
            <option defaultValue="">
              --Merci de choisir une option--
            </option>
            <option value="41430">
              Inférieures ou égales à 41 430 €
            </option>
            <option value="92070">
              Supérieures à 41430 € et inférieures ou égales à 92
              070 €
            </option>
            <option value="92071">Supérieures à 92 070 €</option>
          </select>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <h2>Simulation de salaire</h2>
      <p>{requestCalcul.brutMensuelFamilleA}</p>
      <div class="form-group">
        <div>
          <label>
            Quel est le temps de travail effectif hebdomadaire de
            votre garde d'enfant(s) ?
          </label>
          <input
            class="form-control"
            type="number"
            value={heuresHebdo}
            onChange={e =>
              setheuresHebdo(parseInt(e.target.value, 10))
            }
            min="1"
            max="48"
          />
        </div>

        <div>
          <label for="region-select">
            Dans quelle région habitez-vous ?
          </label>
          <select
            class="form-control"
            name="region"
            id="region-select"
            onChange={e => setalsaceMoselle(parseInt(e.target.value))}
          //value={alsaceMoselle}
          >
            <option value="">--Merci de choisir une option--</option>
            <option value="0">
              France Métropolitaine ou DOM
            </option>
            <option value="1">Alsace-Moselle</option>
          </select>
        </div>

        <div className="simFormNumberInput">
          <label>
            Quel est le salaire brut horaire de votre garde
            d'enfant(s) ?
          </label>
          <input
            class="form-control"
            type="number"
            value={tauxHoraire}
            onChange={e =>
              settauxHoraire(parseFloat(e.target.value, 10))
            }
            min="10"
            max="100"
          />
        </div>

        <p>La garde est-elle partagée ?</p>
        <div className="input-group">
          <div className="radio">
            <label class="input-group-text">
              <input
                type="radio"
                className="checked"
                value="true"
                checked={gardeAlternee == "true"}
                onChange={e => setgardeAlternee(e.target.value)}
              />
              Oui
            </label>
          </div>

          <div className="radio">
            <label class="input-group-text">
              <input
                type="radio"
                className="checked"
                value="false"
                checked={gardeAlternee == "false"}
                onChange={e => setgardeAlternee(e.target.value)}
              />
              Non
            </label>
          </div>
        </div>

        {gardeAlternee == "true" ? (
          <div className="simFormNumberInput">
            <label>
              Quelle part du coût de la garde allez-vous supporter ?
            </label>
            <input
              type="range"
              class="custom-range"
              value={repartitionFamille}
              onChange={e =>
                setrepartitionFamille(parseInt((e.target.value)))
              }
              min="0"
              max="100"
              step="10"
              id="customRange3"
            ></input>
            {repartitionFamille} %
          </div>
        ) : (
            ''
          )}

        <div className="simFormNumberInput">
          <label for="child-number">
            Combien d'enfants avez-vous à charge ?
          </label>
          <select
            class="form-control"
            name="childs"
            id="child-select"
            onChange={e => setnbEnfants(parseInt(e.target.value))}
            value={nbEnfants}
          >
            <option value="">--Merci de choisir une option--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

        </div>

        <div className="simFormNumberInput">
          <label>Quel est l'âge du plus jeune enfant gardé ?</label>
          <input
            class="form-control"
            type="number"
            value={enfantPlusJeune}
            onChange={e =>
              setenfantPlusJeune(parseInt(e.target.value))
            }
            min="0"
            max="18"
          />
        </div>

        <p className="question8">Elevez-vous seul.e votre enfant ?</p>
        <div className="input-group">
          <div className="radio">
            <label class="input-group-text">
              <input
                type="radio"
                className="checked"
                value="true"
                checked={parentIsole == "true"}
                onChange={e => setparentIsole(e.target.value)}
              />
              Oui
            </label>
          </div>

          <div className="radio">
            <label class="input-group-text">
              <input
                type="radio"
                className="checked"
                value="false"
                checked={parentIsole == "false"}
                onChange={e => setparentIsole(e.target.value)}
              />
              Non
            </label>
          </div>
        </div>

        {parentIsole == "true" ? (
          <div className="simFormNumberInput">
            <label for="salarySelect">
              Quels sont vos revenus nets mensuels ?
            </label>
            <div
              onChange={e => setressourcesAnnuelles(parseInt(e.target.value))}
            >
              {handleQuestion9True()}
            </div>
          </div>
        ) : (
            <div className="simFormNumberInput">
              <label for="salarySelect">
                9. Quels sont les revenus nets annuels du foyer ?
            </label>
              <div
                onChange={e => setressourcesAnnuelles(parseInt(e.target.value))}
              >
                {handleQuestion9()}
              </div>
            </div>
          )}

        <button className=" col-3 btn btn-primary" type="submit" onClick={() => showData()}>Calculer</button>



        {/* Ici nouveau composant pour résultats + hypothèses modifiables */}

        {/* {showResults == true ? <ResultCharges /> : ''} */}

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
                        <th scope="row">Ce que gagne la nounou</th>
                        <td>{requestCalcul.netMensuelFamilleA}</td>
                        <td>{requestCalcul.netMensuelFamilleA + requestCalcul.netMensuelFamilleB }</td>
                    </tr>
                    <tr>
                        <th scope="row">Ce que la garde me coûte (avec les aides)</th>
                        <td></td>
                    </tr>
                </tbody>
            </table>


        <Link to="/">
          <p className="simFormReturn">Retour aux simulateurs</p>
        </Link>
      </div>
    </div>
  )
}

export default SimForm
