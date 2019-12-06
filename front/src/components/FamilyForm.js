import React, {useState, useEffect} from 'react'

const FamilyForm = () => {

// state en hook pour les réponses

    const [answers1, setAnswers1] = useState(0)
    const [answers2, setAnswers2] = useState(0)
    const [answers3, setAnswers3] = useState()

  

    return(
        <div>

          <h2>Formulaire garde partagée</h2>
            {/* question 1 toujours visible + envoi de la valeur dans le state answers1 + converti la valeur obtenue en number*/}

            <p className='question1'>Combien d'enfants sont gardés par la nounou ?</p>
            <input type = 'number'classname='answers1' value = {answers1} onChange = {e => setAnswers1(parseInt(e.target.value, 10))} min = '1' max = '10' onClick = {e => setAnswers2(0)} />

            {/* si on a plus d'un enfant question 2 apparait */}

            {answers1 > 1 ? <div><p className='question2'>Combien sont à vous ?</p> <input type = 'number'classname='answers2' value = {answers2} onChange = {e => setAnswers2(parseInt(e.target.value, 10))} min = "1" max = {answers1} onClick = {e => setAnswers3('')}/> </div> :''}
            
             
            {/* question 3 avec un radio check oui/non : garde partagée avec ex si plusieurs enfants */}

            { answers1 === answers2 && answers1 > 1 ? 
              <div>
                <p className='question3'>Les enfants sont-ils en garde partagée avec l'autre parent ?</p>
                <div className="radio">
                  <label>
                    <input type="radio" value="oui" checked={answers3 === 'oui'} onChange = {e => setAnswers3(e.target.value)} />
                    Oui
                  </label>
                </div>

                <div className="radio">
                  <label>
                    <input type="radio" value="non" checked={answers3 === 'non'} onChange = {e => setAnswers3(e.target.value)} />
                    Non
                   </label>
                </div>
              
              </div>
              : ''             
            }

            {/* question 3 avec un radio check oui/non : garde partagée avec ex si un enfant */}

            { answers1 == 1 ? 
            <div>
            <p className='question3'>L'enfant est-il en garde partagée avec l'autre parent ?</p>
            <div className="radio">
              <label>
                <input type="radio" value="oui" checked={answers3 === 'oui'} onChange = {e => setAnswers3(e.target.value)} />
                Oui
              </label>
            </div>

            <div className="radio">
              <label>
                <input type="radio" value="non" checked={answers3 === 'non'} onChange = {e => setAnswers3(e.target.value)} />
                Non
               </label>
            </div>
          
          </div>
          : ''
            }
    

    {/* Message erreur si pas garde partagée  */}

        {answers1 === 1 && answers3 === 'non' ?<p className='error1'>La garde de l'enfant n'étant pas partagée, l'intégralité des coût de celle-ci est à votre charge</p> : ''}
        {answers1 === answers2 && answers3 === 'non' ? <p>La garde des enfants n'étant pas partagée, l'intégralité des coût de celle-ci est à votre charge</p> : ''}

    {/* si on est en co-partage : planning apparait */}

        {answers1 === answers2 && answers3 === 'oui' || answers1 === 1 && answers3 === 'oui' ? <p>Boum planning</p> : ''}
        {answers2 < answers1 && answers2 !== 0  ? <p>Boum planning</p> : '' }

        </div>
    )
}

export default FamilyForm