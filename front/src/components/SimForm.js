import React, { useState, useEffect } from 'react'
import './SimForm.css'

const SimForm = () => {
  // initialize value to the one in the localstorage in the first render
  const initialAnswer1 = () =>
    Number(window.localStorage.getItem('answersSim1')) || 0
  const initialAnswer2 = () =>
    Number(window.localStorage.getItem('answersSim2')) || 0
  const initialAnswer3 = () =>
    window.localStorage.getItem('answersSim3')

  // state en hook pour les réponses

  const [answersSim1, setanswersSim1] = useState(initialAnswer1)
  const [answersSim2, setanswersSim2] = useState(initialAnswer2)
  const [answersSim3, setanswersSim3] = useState(initialAnswer3)

  //store the data in local storage
  useEffect(() => {
    window.localStorage.setItem('answersSim1', answersSim1)
    window.localStorage.setItem('answersSim2', answersSim2)
    window.localStorage.setItem('answersSim3', answersSim3)
  }, [answersSim1, answersSim2, answersSim3]) //callback run only the answers change

  return (
    <div className="simFormParent">
      <h2>Simulation de salaire</h2>
      <div className="simForm">
        {/* question 1 toujours visible + envoi de la valeur dans le state answersSim1 */}
        <div className="simFormNumberInput">
          <p className="question1">
            Salaire demandé par heure ? (BRUT)
          </p>
          <input
            className="simFNumber"
            type="number"
            value={answersSim1}
            onChange={e => setanswersSim1(e.target.value)}
          />
        </div>

        {/* une fois le salaire entré, la question 2 apparait */}

        {answersSim1 > '1' ? (
          <div className="simFormNumberInput">
            <p className="question2">Combien d'aides avez vous ?</p>{' '}
            <input
              className="simFNumber"
              type="number"
              value={answersSim2}
              onChange={e => setanswersSim2(e.target.value)}
            />{' '}
          </div>
        ) : (
          console.log('waiting for answer1...')
        )}

        {/* {answersSim2 > answersSim1 ? (
        <p>...</p>
      ) : (
        console.log('ok')
      )} */}

        {answersSim2 < '1' ? (
          console.log('waiting for answer2...')
        ) : (
          <div>
            <p className="question3">
              Nombre d'heures envisagées dans le mois ?
            </p>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="30"
                  checked={answersSim3 === '30'}
                  onChange={e => setanswersSim3(e.target.value)}
                />
                30
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="40"
                  checked={answersSim3 === '40'}
                  onChange={e => setanswersSim3(e.target.value)}
                />
                40
              </label>
            </div>
          </div>
        )}
        <p className="simFormReturn">Retour aux simulateurs</p>
      </div>
    </div>
  )
}

export default SimForm
