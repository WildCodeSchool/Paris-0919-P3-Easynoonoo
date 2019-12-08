import React, { useState } from 'react'
import './FamilyForm.css'


const FamilyForm = () => {

  // state en hook pour les réponses

  const [answers1, setAnswers1] = useState(0)
  const [answers2, setAnswers2] = useState(0)
  const [answers3, setAnswers3] = useState()



  return (
    <div className='familyFormParent'>

    <h2>Simulation de garde partagée</h2>

      <div className='familyForm'>
        
        {/* question 1 toujours visible + envoi de la valeur dans le state answers1 + converti la valeur obtenue en number*/}

        <div className='familyFormNumberInput'>
          <label>Au total, combien d'enfants seront gardés par la nounou ?</label>
          <input className = 'familyFNumber' type='number' classname='answers1' value={answers1} onChange={e => setAnswers1(parseInt(e.target.value, 10))} min='1' max='10' onClick={e => setAnswers2(0)} />      
        </div>

        {/* si on a plus d'un enfant question 2 apparait */}

        {answers1 > 1 ? <div className ='familyFormNumberInput'><label className='question2'>Parmi ces enfants, combien sont à vous ?</label> <input type='number' classname='answers2' value={answers2} onChange={e => setAnswers2(parseInt(e.target.value, 10))} min="1" max={answers1} onClick={e => setAnswers3('')} /> </div> : ''}


        {/* question 3 avec un radio check oui/non : garde partagée avec ex si plusieurs enfants */}

        {answers1 === answers2 && answers1 > 1 ?
          <div>
            <p className='question3'>La garde de vos enfants est-elle partagée avec un autre parent ?</p>
            <div className="radio">
              <label>
                <input type="radio" value="oui" checked={answers3 === 'oui'} onChange={e => setAnswers3(e.target.value)} />
                Oui
                  </label>
            </div>

            <div className="radio">
              <label>
                <input type="radio" value="non" checked={answers3 === 'non'} onChange={e => setAnswers3(e.target.value)} />
                Non
                   </label>
            </div>

          </div>
          : ''
        }

        {/* question 3 avec un radio check oui/non : garde partagée avec ex si un enfant */}

        {answers1 == 1 ?
          <div>
            <p className='question3'>La garde de votre enfant est-elle partagée avec un autre parent ?</p>
            <div className="radio">
              <label>
                <input type="radio" value="oui" checked={answers3 === 'oui'} onChange={e => setAnswers3(e.target.value)} />
                Oui
              </label>
            </div>

            <div className="radio">
              <label>
                <input type="radio" value="non" checked={answers3 === 'non'} onChange={e => setAnswers3(e.target.value)} />
                Non
               </label>
            </div>
          </div>
          : ''
        }

        {/* Message erreur si pas garde partagée  */}
        {answers1 === 1 && answers3 === 'non' ? <p className='error1'>La garde de l'enfant n'étant pas partagée, l'intégralité des coûts de celle-ci est à votre charge</p> : ''}
        {answers1 === answers2 && answers3 === 'non' ? <p className='error1'>La garde des enfants n'étant pas partagée, l'intégralité des coûts de celle-ci est à votre charge</p> : ''}

        {/* si on est en co-partage : planning apparait */}
        {answers1 === answers2 && answers3 === 'oui' || answers1 === 1 && answers3 === 'oui' ? <p>Boum planning</p> : ''}
        {answers2 < answers1 && answers2 !== 0 ? <p>Boum planning</p> : ''}
        <p className ='familyFormReturn'>Retour aux simulateurs</p>
      </div>

      



    </div>
  )
}

export default FamilyForm