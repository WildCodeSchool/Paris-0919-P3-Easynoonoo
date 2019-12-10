import React, { useState, useEffect } from 'react'
import './SimForm.css'

const SimForm = () => {
  // initialize value to the one in the localstorage in the first render
  const initialAnswer1 = () =>
    Number(window.localStorage.getItem('answersSim1'))
  const initialAnswer2 = () =>
    Number(window.localStorage.getItem('answersSim2'))
  const initialAnswer3 = () =>
    window.localStorage.getItem('answersSim3')
  const initialAnswer4 = () =>
    window.localStorage.getItem('answersSim4')

  // state en hook pour les réponses

  const [answersSim1, setAnswersSim1] = useState(initialAnswer1)
  const [answersSim2, setAnswersSim2] = useState(initialAnswer2)
  const [answersSim3, setAnswersSim3] = useState(initialAnswer3)
  const [answersSim4, setAnswersSim4] = useState(initialAnswer4)

  //store the data in local storage
  useEffect(() => {
    window.localStorage.setItem('answersSim1', answersSim1)
    window.localStorage.setItem('answersSim2', answersSim2)
    window.localStorage.setItem('answersSim3', answersSim3)
    window.localStorage.setItem('answersSim4', answersSim4)
  }, [answersSim1, answersSim2, answersSim3, answersSim4]) //callback run only the answers change

  return (
    <div className="simFormParent">
      <h2>Simulation de salaire</h2>
      <div className="simForm">
        <div className="simFormNumberInput">
          <label>
            Quel est le temps de travail effectif hebdomadaire de
            votre garde d'enfant.s ? *
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
            Dans quelle région habitez-vous ? *
          </label>
          <select
            name="region"
            id="region-select"
            onClick={e => setAnswersSim2(e.target.value)}
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
          <label>Quel est son salaire BRUT horaire ? *</label>
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
        <p className="question3">
          La garde de vos enfants est-elle partagée ?
        </p>
        <div className="radio">
          <label>
            <input
              type="radio"
              className="checked"
              value="oui"
              checked={answersSim4 === 'oui'}
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
              value="non"
              checked={answersSim4 === 'non'}
              onChange={e => setAnswersSim4(e.target.value)}
            />
            Non
          </label>
        </div>

        <p className="simFormReturn">Retour aux simulateurs</p>
      </div>
    </div>
  )
}

export default SimForm
