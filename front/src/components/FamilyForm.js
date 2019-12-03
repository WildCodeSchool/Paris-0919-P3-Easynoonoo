import React, {useState} from 'react'

const FamilyForm = () => {

    //const pititeOption = () => {
    // let pitite = document.getElementsByClassName("optionQuestion");
    // let result = pitite.options[pitite.selectedIndex].value;
    // alert(result);}
    

    // const [question, setQuestion] = useState([{
    //     question1 : "nounou ?",
    //     question2 : "garde ?",
    //     question3 : "Enfant ?"  
    // }]);
    
    const [answers1, setAnswers1] = useState('1')
    const [answers2, setAnswers2] = useState()


    return(
        <div>
            <p className='question1'>Combien d'enfants sont gardés par la nounou ?</p>
            <input type = 'text'classname='answerNum' value = {answers1} onChange = {e => setAnswers1(e.target.value)} min = "1" max = "10"/>
            {console.log(answers1)}

            <p className='question2'>L'enfant est-il en garde partagé avec l'autre parents ?</p>
            <select className='optionQuestion'>
                <option value = 'oui' onChange = {e => setAnswers2(e.target.value)} >Oui</option>
                {console.log(answers2)}
                <option value = 'non'>Non</option>
            </select>


            {/* <button type="button" onClick={pititeOption()}>Get Selected Value</button> */}

        </div>
    )
}

export default FamilyForm