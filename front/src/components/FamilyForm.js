import React, { useState, useEffect } from 'react'
import './FamilyForm.css'


const FamilyForm = () => {

  const childArray = []
  // initialize value to the one in the localstorage in the first render 
  const initialAnswer1 = () => Number(window.localStorage.getItem('answers1')) || 0
  const initialAnswer2 = () => Number(window.localStorage.getItem('answers2')) || 0
  const initialAnswer3 = () => window.localStorage.getItem('answers3')
  // const initialmyChild = () => window.localStorage.getItem('myChild') || []
  // const initialNotMyChild = () => window.localStorage.getItem('NotMyChild') || []

  // state en hook pour les réponses

  const [answers1, setAnswers1] = useState(initialAnswer1)
  const [answers2, setAnswers2] = useState(initialAnswer2)
  const [answers3, setAnswers3] = useState(initialAnswer3)

  const [myChild, setmyChild] = useState([])
  const [notMyChild, setNotMyChild] = useState([])

  const [firstname, setFirstname] = useState('')
  const [firstnameOthers, setFirstnameOthers] = useState('')

  const [count, setCount] = useState(1)
  const [count2, setCount2] = useState(1)

  //store the data in local storage
  useEffect( () => {
    window.localStorage.setItem('answers1', answers1)
    window.localStorage.setItem('answers2', answers2)
    window.localStorage.setItem('answers3', answers3)
    window.localStorage.setItem('myChild', JSON.stringify(myChild))
    window.localStorage.setItem('notMyChild', JSON.stringify(notMyChild))
    console.log(`enfant:${myChild}`)
  }, [answers1, answers2, answers3, myChild, notMyChild]) //callback run only the answers change
    
  const handleName =  () => {
    
  if (count <= answers2) {
   setmyChild([...myChild, firstname]);
   setFirstname('');
   setCount(count+1)
   console.log({count})
   console.log({answers2})
  }
   if (count > answers2) {
    setFirstname('')
   }
  }

  const handleNameOthers = async () => {
    if (count2 <= answers1 - answers2) {
      setNotMyChild([...notMyChild, firstnameOthers]);
      setFirstnameOthers('');
      setCount2(count2+1)
     }
      if (count2 > answers1 - answers2) {
       setFirstnameOthers('')
      }
   }

   const restart1 = () => {
    setmyChild([]);
    setNotMyChild([]);
    setAnswers2(1);
    setCount(1);
    setCount2(1)
   }

   const restart2 = () => {
    setmyChild([]);
    setNotMyChild([]);
    setCount(1);
    setCount2(1)
   }

  return (
    <div className='familyFormParent'>

    <h2>Simulation de garde partagée</h2>

      <div className='familyForm'>
        
        {/* question 1 toujours visible + envoi de la valeur dans le state answers1 + converti la valeur obtenue en number*/}

        <div className='familyFormNumberInput'>
          <label className='question1'>Au total, combien d'enfants seront gardés par la nounou ?</label>
          <input className = 'familyFNumber' type='number' classname='answers1' value={answers1} onChange={e => setAnswers1(parseInt(e.target.value, 10))} min='1' max='5' onClick={() => restart1()} />      
        </div>

        {/* si on a plus d'un enfant question 2 apparait */}

        {answers1 > 1 ? <div className ='familyFormNumberInput'><label className='question2'>Parmi ces enfants, combien sont à vous ?</label> <input type='number' classname='answers2' value={answers2} onChange={e => setAnswers2(parseInt(e.target.value, 10))} min="1" max={answers1} onClick={() => restart2()} /> </div> : ''}


        {/* question 3 avec un radio check oui/non : garde partagée avec ex si plusieurs enfants */}

        {answers1 === answers2 && answers1 > 1 ?
          <div>
            <p className='question3'>La garde de vos enfants est-elle partagée avec un autre parent ?</p>
            <div className="radio">
              <label>
                <input type="radio" className='checked' value="oui" checked={answers3 === 'oui'} onChange={e => setAnswers3(e.target.value)} />
                Oui
                  </label>
            </div>

            <div className="radio">
              <label>
                <input type="radio" className='checked' value="non" checked={answers3 === 'non'} onChange={e => setAnswers3(e.target.value)} />
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
        {answers2 < answers1 && answers2 !== 0 ?
        <div>
          <p className='question4'>Comment s'appellent les enfants ?</p>
            <div className ='arrayChild'>
              <p>mes enfants :
                <input type='text'value={firstname} onChange={e => setFirstname(e.target.value)}/>
                <input type='button'onClick={() => handleName()} value='add'/>
                {(myChild.map(e => <div>{e}</div>))}
                </p>
              <p>les autres enfants :
              <input type='text' value={firstnameOthers} onChange={e => setFirstnameOthers(e.target.value)}/>
                <input type='button'onClick={() => handleNameOthers()} value='add'/>
                {notMyChild.map(e => <div>{e}</div>)}
              </p>
            </div>
        </div>
         : ''}
        <p className ='familyFormReturn'>Retour aux simulateurs</p>
      </div>

      



    </div>
  )
}

export default FamilyForm