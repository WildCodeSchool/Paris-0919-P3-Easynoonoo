import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SimForm.css'

const SimForm = () => {
  // initialize value to the one in the localstorage in the first render
  const initialAnswer1 = () =>
    Number(window.localStorage.getItem('answersSim1')) || 0
  const initialAnswer2 = () =>
    Number(window.localStorage.getItem('answersSim2')) || 0
  const initialAnswer3 = () =>
    window.localStorage.getItem('answersSim3') || 0
  const initialAnswer4 = () =>
    window.localStorage.getItem('answersSim4') || 0
  const initialAnswer5 = () =>
    window.localStorage.getItem('answersSim5') || 0
  const initialAnswer6 = () =>
    window.localStorage.getItem('answersSim6') || 0
  const initialAnswer7 = () =>
    window.localStorage.getItem('answersSim7') || 0
  const initialAnswer8 = () =>
    window.localStorage.getItem('answersSim8') || 0
  const initialAnswer9 = () =>
    window.localStorage.getItem('answersSim9') || 0

  // state en hook pour les réponses

  const [answersSim1, setAnswersSim1] = useState(initialAnswer1)
  const [answersSim2, setAnswersSim2] = useState(initialAnswer2)
  const [answersSim3, setAnswersSim3] = useState(initialAnswer3)
  const [answersSim4, setAnswersSim4] = useState(initialAnswer4)
  const [answersSim5, setAnswersSim5] = useState(initialAnswer5)
  const [answersSim6, setAnswersSim6] = useState(initialAnswer6)
  const [answersSim7, setAnswersSim7] = useState(initialAnswer7)
  const [answersSim8, setAnswersSim8] = useState(initialAnswer8)
  const [answersSim9, setAnswersSim9] = useState(initialAnswer9)

  //store the data in local storage
  useEffect(() => {
    window.localStorage.setItem('answersSim1', answersSim1)
    window.localStorage.setItem('answersSim2', answersSim2)
    window.localStorage.setItem('answersSim3', answersSim3)
    window.localStorage.setItem('answersSim4', answersSim4)
    window.localStorage.setItem('answersSim5', answersSim5)
    window.localStorage.setItem('answersSim6', answersSim6)
    window.localStorage.setItem('answersSim7', answersSim7)
    window.localStorage.setItem('answersSim8', answersSim8)
    window.localStorage.setItem('answersSim9', answersSim9)
  }, [
    answersSim1,
    answersSim2,
    answersSim3,
    answersSim4,
    answersSim5,
    answersSim6,
    answersSim7,
    answersSim8,
    answersSim9,
  ]) //callback run only the answers change

  // useEffect(() => {
  //   handleQuestion9()
  //   handleQuestion9True()
  // }, [answersSim8])

  const handleQuestion9 = () => {
    if (
      (answersSim6 == 1 && answersSim7 <= 3) ||
      (answersSim6 == 1 && answersSim7 >= 3)
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
      (answersSim6 == 2 && answersSim7 <= 3) ||
      (answersSim6 == 2 && answersSim7 >= 3)
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
      (answersSim6 == 3 && answersSim7 <= 3) ||
      (answersSim6 == 3 && answersSim7) >= 3
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
      (answersSim6 == 4 && answersSim7 <= 3) ||
      (answersSim6 == 4 && answersSim7 >= 3)
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
      (answersSim6 == 1 && answersSim7 <= 3) ||
      (answersSim6 == 1 && answersSim7 >= 3)
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
      (answersSim6 == 2 && answersSim7 <= 3) ||
      (answersSim6 == 2 && answersSim7 >= 3)
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
      (answersSim6 == 3 && answersSim7 <= 3) ||
      (answersSim6 == 3 && answersSim7) >= 3
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
      (answersSim6 == 4 && answersSim7 <= 3) ||
      (answersSim6 == 4 && answersSim7 >= 3)
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
            value={answersSim1}
            onChange={e =>
              setAnswersSim1(parseInt(e.target.value, 10))
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
            onChange={e => setAnswersSim2(e.target.value)}
            value={answersSim2}
          >
            <option value="">--Merci de choisir une option--</option>
            <option value="france">
              France Métropolitaine (hors Alsace-Moselle)
            </option>
            <option value="alsace">Alsace-Moselle</option>
            <option value="dom">DOM-TOM</option>
          </select>
        </div>

        <div className="simFormNumberInput">
          <label>
            3. Quel est le salaire brut horaire de votre garde
            d'enfant(s) ?
          </label>
          <input
            type="number"
            value={answersSim3}
            onChange={e =>
              setAnswersSim3(parseFloat(e.target.value, 10))
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
              checked={answersSim4 == 'true'}
              onChange={e => setAnswersSim4(e.target.value)}
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
              checked={answersSim4 == 'false'}
              onChange={e => setAnswersSim4(e.target.value)}
            />
            Non
          </label>
        </div>

        {answersSim4 == 'true' ? (
          <div className="simFormNumberInput">
            <label>
              5. Quelle part du coût de la garde allez-vous supporter
              (en %) ?
            </label>
            <input
              type="number"
              value={answersSim5}
              onChange={e => setAnswersSim5(parseInt(e.target.value))}
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
            onChange={e => setAnswersSim6(e.target.value)}
            value={answersSim6}
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
            value={answersSim7}
            onChange={e => setAnswersSim7(parseInt(e.target.value))}
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
              checked={answersSim8 == 'true'}
              onChange={e => setAnswersSim8(e.target.value)}
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
              checked={answersSim8 == 'false'}
              onChange={e => setAnswersSim8(e.target.value)}
            />
            Non
          </label>
        </div>

        {answersSim8 == 'true' ? (
          <div className="simFormNumberInput">
            <label for="salarySelect">
              9. Quels sont vos revenus nets mensuels ?
            </label>
            <div onChange={e => setAnswersSim9(e.target.value)}>
              {handleQuestion9True()}
            </div>
          </div>
        ) : (
          <div className="simFormNumberInput">
            <label for="salarySelect">
              9. Quels sont les revenus nets mensuels du foyer ?
            </label>
            <div onChange={e => setAnswersSim9(e.target.value)}>
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
