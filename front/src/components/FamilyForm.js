import React, {useState} from 'react'

const FamilyForm = () => {

    const [answers1, setAnswers1] = useState('')
    const [answers2, setAnswers2] = useState()
    const [answers3, setAnswers3] = useState()


    return(
        <div>
            <p className='question1'>Combien d'enfants sont gardés par la nounou ?</p>
            <input type = 'text'classname='answers1' value = {answers1} onChange = {e => setAnswers1(e.target.value)} min = "1" max = "10"/>

            {answers1 !== '1' && answers1 !== '' ? <div><p className='question2'>Combien sont à vous ?</p> <input type = 'text'classname='answers2' value = {answers2} onChange = {e => setAnswers2(e.target.value)} min = "1" max = "10"/> </div> : console.log('nope')}
            

            <p className='question3'>L'enfant est-il en garde partagé avec l'autre parents ?</p>
            <div className="radio">
          <label>
            <input type="radio" value="oui" checked={answers3 === 'oui'} onChange = {e => setAnswers3(e.target.value)} />
            Oui
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="non" checked={answers2 === 'non'} onChange = {e => setAnswers3(e.target.value)} />
            Non
          </label>

        </div>
        {answers1 === '1' && answers3 === 'non' ?<p className='error1'>Tu payes tout lol</p> : console.log('lol')}

        </div>
    )
}

export default FamilyForm