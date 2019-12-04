import React, { useState } from 'react'

const SimForm = () => {
  // state en hook pour les réponses

  const [answers1, setAnswers1] = useState('')
  const [answers2, setAnswers2] = useState()
  const [answers3, setAnswers3] = useState()

  return (
    <div>
      {/* question 1 toujours visible + envoi de la valeur dans le state answers1 */}

      <p className="question1">Salaire demandé par heure ? (BRUT)</p>
      <input
        type="number"
        classname="answers1"
        value={answers1}
        onChange={e => setAnswers1(e.target.value)}
      />
      {/* une fois le salaire entré, la question 2 apparait */}

      {answers1 > '1' ? (
        <div>
          <p className="question2">Combien d'aides avez vous ?</p>{' '}
          <input
            type="number"
            classname="answers2"
            value={answers2}
            onChange={e => setAnswers2(e.target.value)}
          />{' '}
        </div>
      ) : (
        console.log('nope')
      )}

      {answers2 > answers1 ? (
        <p>No trolling please !!</p>
      ) : (
        console.log('ok')
      )}

      {answers2 == null ? (
        <p>L'embauche de votre nounou vous coutera : ?</p>
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
                checked={answers3 === '30'}
                onChange={e => setAnswers3(e.target.value)}
              />
              30
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="40"
                checked={answers3 === '40'}
                onChange={e => setAnswers3(e.target.value)}
              />
              40
            </label>
          </div>
        </div>
      )}
      {answers1 === '1' && answers3 === 'non' ? (
        <p className="error1">Tu payes tout lol</p>
      ) : (
        console.log('lol')
      )}
      {answers1 === answers2 && answers3 === 'non' ? (
        <p>Tu payes tout lol</p>
      ) : (
        console.log('jaaj')
      )}
      {(answers1 === answers2 && answers3 === 'oui') ||
      (answers1 === '1' && answers3 === 'oui') ? (
        <p>Boum planning</p>
      ) : (
        console.log('joj')
      )}
    </div>
  )
}

export default SimForm
