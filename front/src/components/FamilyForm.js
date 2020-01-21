import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import FamilyAgenda from './FamilyAgenda'

import './FamilyForm.css'


const FamilyForm = () => {

  // initialize value to the one in the localstorage in the first render 
  const initialAnswer1 = () => Number(window.localStorage.getItem('answers1')) || 0
  const initialAnswer2 = () => Number(window.localStorage.getItem('answers2')) || 0
  const initialAnswer3 = () => window.localStorage.getItem('answers3')

  // state en hook pour les réponses
  const [answers1, setAnswers1] = useState(initialAnswer1)
  const [answers2, setAnswers2] = useState(initialAnswer2)
  const [answers3, setAnswers3] = useState(initialAnswer3)

  // state qui contient les prénoms des enfants
  const [myChild, setmyChild] = useState([])
  const [notMyChild, setNotMyChild] = useState([])

  // state intermédiaire qui contient la valeur du prénom dans l'input
  const [firstname, setFirstname] = useState('')

  // state qui permet de bloquer l'ajout d'enfant
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  //store the data in local storage
  useEffect( () => {
    window.localStorage.setItem('answers1', answers1)
    window.localStorage.setItem('answers2', answers2)
    window.localStorage.setItem('answers3', answers3)
    window.localStorage.setItem('myChild', JSON.stringify(myChild)) //transforme la valeur en strings dans un tableau
    window.localStorage.setItem('notMyChild', JSON.stringify(notMyChild))
  }, [answers1, answers2, answers3, myChild, notMyChild]) //callback run if only the answers change
    
  // 1. stocke la nouvelle valeur de l'input dans la state myChild/notMyChild
  // 2. réinitialise firstname à vide
  // 3. écoute la valeur de l'input avec Count
  // 4. + cas pour l'enfant unique

   const handleName = () => {
     if (count < answers1 && answers2 == 0 || count < answers2  && answers2 != 0   ) {
      setmyChild([...myChild, firstname]);
      setFirstname('');
      setCount(count + 1)
     } else {
       if (count2 < answers1 - answers2) {
        setNotMyChild([...notMyChild, firstname]);
        setFirstname('');
        setCount2(count2+1)       
       } else {
         return alert("Can't add more children")
       }
     }
   }

  // réinitialise les states quand on clique sur le premier input
   const restart1 = () => {
    setmyChild([]);
    setNotMyChild([]);
    setAnswers2(0);
    setCount(0);
    setCount2(0);
   }

  // réinitialise les states quand on clique sur le deuxième input
   const restart2 = () => {
    setmyChild([]);
    setNotMyChild([]);
    setCount(0);
    setCount2(0);
   }

  

  return (
  <div className='familyForm'>

    <h2>Simulation de garde partagée</h2>

    {count === answers2 && count2 === answers1 - answers2  && count2 !== 0 || count === answers1 && count2 === 0 && answers3 === 'oui' ? '': //if calendar appears, questions disappears

      <div className='container-fluid d-flex flex-column justify-content-center no-wrap '>
        
        {/* question 1 toujours visible + envoi de la valeur dans le state answers1 + converti la valeur obtenue en number*/}

        <div className='row firstQuestion'>
          <label className='col question1'><p>Au total, combien d'enfants sont gardés par votre nounou ?</p></label>
          <input className = 'familyFNumber' type='number' classname='answers1' value={answers1} onChange={e => setAnswers1(parseInt(e.target.value, 10))} min='1' max='5' onClick={() => restart1()} />      
        </div>

        {/* si on a plus d'un enfant question 2 apparait */}

        {answers1 > 1 ? <div className ='row familyFormNumberInput'><label className='question2'>Parmi ces {answers1} enfants, combien sont de votre famille ?</label> <input type='number' classname='answers2' value={answers2} onChange={e => setAnswers2(parseInt(e.target.value, 10))} min="1" max={answers1} onClick={() => restart2()} /> </div> : ''}


        {/* question 3 avec un radio check oui/non : garde partagée avec ex si plusieurs enfants */}

        {answers1 === answers2 && answers1 > 1 ?
          <div className='row question3'>
            <p >La garde de vos enfants est-elle partagée avec l'autre parent des enfants dont vous seriez séparé(e) ?</p>
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

        {answers1 === 1 ?
          <div className='question3'>
            <p>La garde de votre enfant est-elle partagée avec l'autre parent de l'enfant dont vous seriez séparé(e) ?</p>
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


        {/* si on est en co-partage : la question des prénoms apparaît */}

        {answers1 === 1 && answers3 === 'oui' ?
        <div className='row question4'>
          <p>Comment s'appelle l'enfant ?</p>
          <div class="input-group mb-3">
            <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} class="form-control" placeholder="Prénom" aria-label="Prénom" aria-describedby="button-addon2"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => handleName()}>Ajouter</button>              
            </div>            
          </div>
          {(myChild.map(e => <div>Mon enfant : {e}</div>))}
          
        </div>: ''}

        {answers1 === answers2 && answers3 === 'oui' ?
        <div className='row question4'>
          <p>Comment s'appellent les enfants ?</p>
          <div class="input-group mb-3">
            <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} class="form-control" placeholder="Prénom" aria-label="Prénom" aria-describedby="button-addon2"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => handleName()}>Ajouter</button>              
            </div>            
          </div>
            {(myChild.map(e => <div>Mon enfant : {e} </div>))}
            {(notMyChild.map(e => <div>L'enfant de la co-famille : {e} </div>))}
        </div>: ''}
        {answers2 < answers1 && answers2 !== 0 ?
        <div className='row question4'>
          <p>Comment s'appellent les enfants ?</p>
          <div class="input-group mb-3">
            <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} class="form-control" placeholder="Prénom" aria-label="Prénom" aria-describedby="button-addon2"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => handleName()}>Ajouter</button>              
            </div>            
          </div>
            {(myChild.map(e => <div>Mon enfant : {e} </div>))}
            {(notMyChild.map(e => <div>L'enfant de la co-famille : {e} </div>))}
        </div>
         : ''}
        

      <Link to='/'><p className="simFormReturn">Retour aux simulateurs</p></Link>
      </div>

    }

      <div className ='container-fluid d-flex flex-column justify-content-center familyFormComponent'>
        {/* enfants multiples en garde co-famille : calendrier apparait  */}
          {count === answers2 && count2 === answers1 - answers2  && count2 !== 0 ?
          <FamilyAgenda/> : ''}

         {/* enfants en garde partagée : calendrier apparait  */} 
          {count === answers1 && count2 === 0 && answers3 === 'oui' ? 
          <FamilyAgenda/> : ''}
      </div>
    </div>
  )
}

export default FamilyForm