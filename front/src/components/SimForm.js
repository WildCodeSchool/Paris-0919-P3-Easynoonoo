import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import './SimForm.css'

const SimForm = () => {
  // initialize value to the one in the localstorage in the first render
  const initialAnswer1 = () =>
    Number(window.localStorage.getItem('heuresHebdo')) || 0
  const initialAnswer2 = () =>
    Number(window.localStorage.getItem('alsaceMoselle')) || 0
  const initialAnswer3 = () =>
    window.localStorage.getItem('tauxHoraire') || 0
  const initialAnswer4 = () =>
    window.localStorage.getItem('gardeAlternee') || 0
  const initialAnswer5 = () =>
    window.localStorage.getItem('repartitionFamille') || 100
  const initialAnswer6 = () =>
    window.localStorage.getItem('nbEnfants') || 0
  const initialAnswer7 = () =>
    window.localStorage.getItem('enfantPlusJeune') || 0
  const initialAnswer8 = () =>
    window.localStorage.getItem('parentIsole') || 0
  const initialAnswer9 = () =>
    window.localStorage.getItem('ressourcesAnnuelles') || 0

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

  //store the data in local storage
  useEffect(() => {
    window.localStorage.setItem('heuresHebdo', heuresHebdo)
    window.localStorage.setItem('alsaceMoselle', alsaceMoselle)
    window.localStorage.setItem('tauxHoraire', tauxHoraire)
    window.localStorage.setItem('gardeAlternee', gardeAlternee)
    window.localStorage.setItem(
      'repartitionFamille',
      repartitionFamille / 100,
    )
    window.localStorage.setItem('nbEnfants', nbEnfants)
    window.localStorage.setItem('enfantPlusJeune', enfantPlusJeune)
    window.localStorage.setItem('parentIsole', parentIsole)
    window.localStorage.setItem(
      'ressourcesAnnuelles',
      ressourcesAnnuelles,
    )
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
  ]) //callback run only the answers change

  const handleQuestion9 = () => {
    if (
      (nbEnfants == 1 && enfantPlusJeune <= 3) ||
      (nbEnfants == 1 && enfantPlusJeune >= 3)
    ) {
      return (
        <div>
          <select>
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
          <select>
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
          <select>
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
          <select>
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
          <select>
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
          <select>
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
          <select>
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
          <select>
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
    <div className="simFormParent">
      <h2>Simulation de salaire</h2>
      <div className="simForm">
        <div className="simFormNumberInput">
          <label>
            1. Quel est le temps de travail effectif hebdomadaire de
            votre garde d'enfant(s) ?
          </label>
          <input
            type="number"
            value={heuresHebdo}
            onChange={e =>
              setheuresHebdo(parseInt(e.target.value, 10))
            }
            min="1"
            max="100"
          />
        </div>

        <div className="simFormNumberInput">
          <label for="region-select">
            2. Dans quelle région habitez-vous ?
          </label>
          <select
            name="region"
            id="region-select"
            onChange={e => setalsaceMoselle(e.target.value)}
            value={alsaceMoselle}
          >
            <option value="">--Merci de choisir une option--</option>
            <option value="false">
              France Métropolitaine ou DOM
            </option>
            <option value="true">Alsace-Moselle</option>
          </select>
        </div>

        <div className="simFormNumberInput">
          <label>
            3. Quel est le salaire brut horaire de votre garde
            d'enfant(s) ?
          </label>
          <input
            type="number"
            value={tauxHoraire}
            onChange={e =>
              settauxHoraire(parseFloat(e.target.value, 10))
            }
            min="10"
            max="100"
          />
        </div>

        <p className="question4">4. La garde est-elle partagée ?</p>
        <div className="radio">
          <label>
            <input
              type="radio"
              className="checked"
              value="true"
              checked={gardeAlternee == 'true'}
              onChange={e => setgardeAlternee(e.target.value)}
            />
            Oui
          </label>
        </div>

        <div className="radio">
          <label>
            <input
              type="radio"
              className="checked"
              value="false"
              checked={gardeAlternee == 'false'}
              onChange={e => setgardeAlternee(e.target.value)}
            />
            Non
          </label>
        </div>

        {gardeAlternee == 'true' ? (
          <div className="simFormNumberInput">
            <label>
              5. Quelle part du coût de la garde allez-vous supporter
              (en %) ?
            </label>
            <input
              type="number"
              value={repartitionFamille}
              onChange={e =>
                setrepartitionFamille(parseInt(e.target.value))
              }
              min="1"
              max="100"
            />
          </div>
        ) : (
          ''
        )}

        <div className="simFormNumberInput">
          <label for="child-number">
            6. Combien d'enfants avez-vous à charge ?
          </label>
          <select
            name="childs"
            id="child-select"
            onChange={e => setnbEnfants(e.target.value)}
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
          <label>
            7. Quel est l'âge du plus jeune enfant gardé ?
          </label>
          <input
            type="number"
            value={enfantPlusJeune}
            onChange={e =>
              setenfantPlusJeune(parseInt(e.target.value))
            }
            min="0"
            max="18"
          />
        </div>

        <p className="question8">
          8. Elevez-vous seul.e votre enfant ?
        </p>
        <div className="radio">
          <label>
            <input
              type="radio"
              className="checked"
              value="true"
              checked={parentIsole == 'true'}
              onChange={e => setparentIsole(e.target.value)}
            />
            Oui
          </label>
        </div>

        <div className="radio">
          <label>
            <input
              type="radio"
              className="checked"
              value="false"
              checked={parentIsole == 'false'}
              onChange={e => setparentIsole(e.target.value)}
            />
            Non
          </label>
        </div>

        {parentIsole == 'true' ? (
          <div className="simFormNumberInput">
            <label for="salarySelect">
              9. Quels sont vos revenus nets mensuels ?
            </label>
            <div
              onChange={e => setressourcesAnnuelles(e.target.value)}
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
              onChange={e => setressourcesAnnuelles(e.target.value)}
            >
              {handleQuestion9()}
            </div>
          </div>
        )}

        <Link to="/">
          <p className="simFormReturn">Retour aux simulateurs</p>
        </Link>
      </div>
    </div>
  )
}

export default SimForm
