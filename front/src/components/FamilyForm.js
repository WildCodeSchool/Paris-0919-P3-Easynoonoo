import React, {useState} from 'react'

const FamilyForm = () => {

    const [answers1, setAnswers1] = useState('1')
    const [answers2, setAnswers2] = useState()


    return(
        <div>
            <p className='question1'>Combien d'enfants sont gardés par la nounou ?</p>
            <input type = 'text'classname='answerNum' value = {answers1} onChange = {e => setAnswers1(e.target.value)} min = "1" max = "10"/>
            {console.log(answers1)}

            <p className='question2'>L'enfant est-il en garde partagé avec l'autre parents ?</p>
            <div className="radio">
          <label>
            <input type="radio" value="option1" checked={answers2 === 'option1'} onChange = {e => setAnswers2(e.target.value)} />
            {console.log(answers2)}
            Oui
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option2" checked={answers2 === 'option2'} onChange = {e => setAnswers2(e.target.value)} />
            {console.log(answers2)}
            Non
          </label>
        </div>


        </div>
    )
}

export default FamilyForm