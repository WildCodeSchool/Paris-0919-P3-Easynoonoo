import React, { useState, useEffect } from "react";
import "./SimForm.css";

const SimForm = () => {
  // initialize value to the one in the localstorage in the first render
  const initialAnswer1 = () =>
    Number(window.localStorage.getItem("answersSim1")) || 0;
  const initialAnswer2 = () =>
    Number(window.localStorage.getItem("answersSim2")) || 0;
  const initialAnswer3 = () => window.localStorage.getItem("answersSim3") || 0;
  const initialAnswer4 = () => window.localStorage.getItem("answersSim4") || 0;
  const initialAnswer5 = () => window.localStorage.getItem("answersSim5") || 0;

  // state en hook pour les réponses

  const [answersSim1, setAnswersSim1] = useState(initialAnswer1);
  const [answersSim2, setAnswersSim2] = useState(initialAnswer2);
  const [answersSim3, setAnswersSim3] = useState(initialAnswer3);
  const [answersSim4, setAnswersSim4] = useState(initialAnswer4);
  const [answersSim5, setAnswersSim5] = useState(initialAnswer5);

  //store the data in local storage
  useEffect(() => {
    window.localStorage.setItem("answersSim1", answersSim1);
    window.localStorage.setItem("answersSim2", answersSim2);
    window.localStorage.setItem("answersSim3", answersSim3);
    window.localStorage.setItem("answersSim4", answersSim4);
    window.localStorage.setItem("answersSim5", answersSim5);
  }, [answersSim1, answersSim2, answersSim3, answersSim4, answersSim5]); //callback run only the answers change

  return (
    <div className="simFormParent">
      <h2>Simulation de salaire</h2>
      <div className="simForm">
        <div className="simFormNumberInput">
          <label>
            1. Quel est le temps de travail effectif hebdomadaire de votre garde
            d'enfant(s) ?
          </label>
          <input
            type="number"
            value={answersSim1}
            onChange={e => setAnswersSim1(parseInt(e.target.value, 10))}
            min="1"
            max="100"
          />
        </div>

        <div className="simFormNumberInput">
          <label for="region-select">
            2. Dans quelle région habitez-vous ?
          </label>
          <select
            name="region"
            id="region-select"
            onChange={e => setAnswersSim2(e.target.value)}
            value={answersSim2}
          >
            <option value="">--Merci de choisir une option--</option>
            <option value="france">
              France Métropolitaine (hors Alsace-Moselle)
            </option>
            <option value="alsace">Alsace-Moselle</option>
            <option value="dom">DOM-TOM</option>
          </select>
        </div>

        <div className="simFormNumberInput">
          <label>
            3. Quel est le salaire brut horaire de votre garde d'enfant(s) ?
          </label>
          <input
            type="number"
            value={answersSim3}
            onChange={e => setAnswersSim3(parseFloat(e.target.value, 10))}
            min="10"
            max="100"
          />
        </div>

        <p className="question3">
          4. La garde de vos enfants est-elle partagée ?
        </p>
        <div className="radio">
          <label>
            <input
              type="radio"
              className="checked"
              value="true"
              checked={answersSim4 === "true"}
              onChange={e => setAnswersSim4(e.target.value)}
            />
            Oui
          </label>
        </div>

   <div className="radio">
          <label>
            <input
              type="radio"
              className="checked"
              value="false"
              checked={answersSim4 === "false"}
              onChange={e => setAnswersSim4(e.target.value)}
            />
            Non
          </label>
        </div>

        {answersSim4 === "true" ? (
          <div className="simFormNumberInput">
            <label>
              5. Quelle part du coût de la garde allez-vous supporter (en %) ?
            </label>
            <input
              type="number"
              value={answersSim5}
              onChange={e => setAnswersSim5(parseInt(e.target.value))}
              min="1"
              max="100"
            />
          </div>
        ) : (
          ""
        )}

        {/* <div className="familyFormNumberInput">
          <label className="question1">
            Au total, combien d'enfants seront gardés par la nounou ?
          </label>
          <input
            className="familyFNumber"
            type="number"
            classname="answers6"
            value={answers1}
            onChange={e => setAnswers1(parseInt(e.target.value, 10))}
            min="1"
            max="10"
            onClick={e => setAnswers2(0)}
          />
        </div> */}

      </div>
      <p className="simFormReturn">Retour aux simulateurs</p>
    </div>
  );
};

export default SimForm;
