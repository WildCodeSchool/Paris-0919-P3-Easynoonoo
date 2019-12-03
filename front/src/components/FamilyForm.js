import React, {useState} from 'react'

const FamilyForm = () => {

    const [question, setQuestion] = useState([]);

    return(
        <div>
            <p>Combien d'enfants sont gardés par la nounou ?</p>
            <input type = 'number' value = '' min = "1" max = "10" />
            <p>L'enfant est-il en garde partagé avec l'autre parents ?</p>
            <select>
                <option value = 'yes'>Oui</option>
                <option value = 'no'>Non</option>
            </select>

        </div>
    )
}

export default FamilyForm