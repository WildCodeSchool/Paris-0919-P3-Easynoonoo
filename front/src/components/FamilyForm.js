import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import FamilyAgenda from './FamilyAgenda'

import './FamilyForm.css'

const FamilyForm = () => {
  // initialize value to the one in the localstorage in the first render
  const initialAnswer1 = () =>
    Number(window.localStorage.getItem('totalEnfants')) || 0
  const initialAnswer2 = () =>
    Number(window.localStorage.getItem('nbEnfants')) || 0
  const initialAnswer3 = () =>
    false //so that it restarts for a new simulation without divorcee

  // state en hook pour les réponses
  const [totalEnfants, setTotalEnfants] = useState(initialAnswer1) //nbr d'enfants total
  const [nbEnfants, setNbEnfants] = useState(initialAnswer2) // propres enfants
  const [gardeAlternee, setGardeAlternee] = useState(initialAnswer3) // parent isolé

  // state qui contient les prénoms des enfants
  const [myChild, setmyChild] = useState([])
  const [notMyChild, setNotMyChild] = useState([])

  // state intermédiaire qui contient la valeur du prénom dans l'input
  const [firstname, setFirstname] = useState('')

  // state qui permet de bloquer l'ajout d'enfant
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  //store the data in local storage
  useEffect(() => {
    window.localStorage.setItem('totalEnfants', totalEnfants)
    window.localStorage.setItem('nbEnfants', nbEnfants)
    window.localStorage.setItem('gardeAlternee', gardeAlternee)
    window.localStorage.setItem('myChild', JSON.stringify(myChild)) //transforme la valeur en strings dans un tableau
    window.localStorage.setItem('notMyChild', JSON.stringify(notMyChild))
    window.localStorage.setItem('items', JSON.stringify([]))
    window.localStorage.setItem('allChildren', JSON.stringify([]) )
  }, [totalEnfants, nbEnfants, gardeAlternee, myChild, notMyChild]) //callback run if only the answers change
    
  // 1. stocke la nouvelle valeur de l'input dans la state myChild
  // 2. réinitialise firstname à vide
  // 3. écoute la valeur de l'input avec Count
  // 4. + cas pour l'enfant unique

  const handleName = () => {
    if (
      (count < totalEnfants && nbEnfants == 0) ||
      (count < nbEnfants && nbEnfants != 0)
    ) {
      setmyChild([...myChild, firstname])
      setFirstname('')
      setCount(count + 1)
    } else {
      if (count2 < totalEnfants - nbEnfants) {
        setNotMyChild([...notMyChild, firstname])
        setFirstname('')
        setCount2(count2 + 1)
      } else {
        return alert("Can't add more children")
      }
    }
  }

  // réinitialise les states quand on clique sur le premier input
  const restart1 = () => {
    setmyChild([])
    setNotMyChild([])
    setNbEnfants(0)
    setCount(0)
    setCount2(0)
  }

  // réinitialise les states quand on clique sur le deuxième input
  const restart2 = () => {
    setmyChild([])
    setNotMyChild([])
    setCount(0)
    setCount2(0)
  }

  const restartCalendar = () => {
    window.localStorage.setItem('items', JSON.stringify([]))
    window.localStorage.getItem('items', JSON.stringify([]))
  }

  return (
    <div className="familyForm">
      <h2>Simulation de garde partagée</h2>

      {(count === nbEnfants &&
        count2 === totalEnfants - nbEnfants &&
        count2 !== 0) ||
      (count === totalEnfants && count2 === 0 && gardeAlternee === 'oui') ? (
        '' //if calendar appears, questions disappears
      ) : (
        <div className="container-fluid d-flex flex-column justify-content-center no-wrap ">
          {/* question 1 toujours visible + envoi de la valeur dans le state answers1 + converti la valeur obtenue en number*/}

          <div className="row firstQuestion">
            <label className="col question1">
              <p>
                Au total, combien d'enfants sont gardés par votre
                nounou ?
              </p>
            </label>
            <input
              className="familyFNumber"
              type="number"
              classname="answers1"
              value={totalEnfants}
              onChange={e =>
                setTotalEnfants(parseInt(e.target.value, 10))
              }
              min="1"
              max="5"
              onClick={() => restart1()}
            />
          </div>

          {/* si on a plus d'un enfant question 2 apparait */}

          {totalEnfants > 1 ? (
            <div className="row familyFormNumberInput">
              <label className="question2">
                Parmi ces {totalEnfants} enfants, combien sont de votre
                famille ?
              </label>{' '}
              <input
                type="number"
                classname="answers2"
                value={nbEnfants}
                onChange={e =>
                  setNbEnfants(parseInt(e.target.value, 10))
                }
                min="1"
                max="4"
                onClick={() => restart2()}
              />{' '}
            </div>
          ) : (
            ''
          )}

          {/* question 3 avec un radio check oui/non : garde partagée avec ex si plusieurs enfants */}

          {totalEnfants === nbEnfants && totalEnfants > 1 ? (
            <div className="row question3">
              <p>
                La garde de vos enfants est-elle partagée avec l'autre
                parent des enfants dont vous seriez séparé(e) ?
              </p>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    className="checked"
                    value="true"
                    checked={gardeAlternee == "true"}
                    onChange={e => setGardeAlternee(e.target.value)}
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
                    checked={gardeAlternee == "false"}
                    onChange={e => setGardeAlternee(e.target.value)}
                  />
                  Non
                </label>
              </div>
            </div>
          ) : (
            ''
          )}

          {/* question 3 avec un radio check oui/non : garde partagée avec ex si un enfant */}

          {totalEnfants === 1 ? (
            <div className="question3">
              <p>
                La garde de votre enfant est-elle partagée avec
                l'autre parent de l'enfant dont vous seriez séparé(e)
                ?
              </p>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={gardeAlternee === "true"}
                    onChange={e => setGardeAlternee(e.target.value)}
                  />
                  Oui
                </label>
              </div>

              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={gardeAlternee === "false"}
                    onChange={e => setGardeAlternee(e.target.value)}
                  />
                  Non
                </label>
              </div>
            </div>
          ) : (
            ''
          )}

          {/* Message erreur si pas garde partagée  */}
          {totalEnfants === 1 && gardeAlternee === "false" ? (
            <p className="error1">
              La garde de l'enfant n'étant pas partagée, l'intégralité
              des coûts de celle-ci est à votre charge
            </p>
          ) : (
            ''
          )}

          {totalEnfants === nbEnfants && gardeAlternee === "false" ? (
            <p className="error1">
              La garde des enfants n'étant pas partagée, l'intégralité
              des coûts de celle-ci est à votre charge
            </p>
          ) : (
            ''
          )}

          {/* si on est en co-partage : la question des prénoms apparaît */}

          {totalEnfants === 1 && gardeAlternee === "true" ? (
            <div className="row question4">
              <p>Comment s'appelle l'enfant ?</p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                  class="form-control"
                  placeholder="Prénom"
                  aria-label="Prénom"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => handleName()}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              {myChild.map(e => (
                <div>Mon enfant : {e}</div>
              ))}
            </div>
          ) : (
            ''
          )}

          {totalEnfants === nbEnfants && gardeAlternee === "true" ? (
            <div className="row question4">
              <p>Comment s'appellent les enfants ?</p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                  class="form-control"
                  placeholder="Prénom"
                  aria-label="Prénom"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => handleName()}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              {myChild.map(e => (
                <div>Mon enfant : {e} </div>
              ))}
              {notMyChild.map(e => (
                <div>L'enfant de la co-famille : {e} </div>
              ))}
            </div>
          ) : (
            ''
          )}
          {nbEnfants < totalEnfants && nbEnfants !== 0 ? (
            <div className="row question4">
              <p>Comment s'appellent les enfants ?</p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                  class="form-control"
                  placeholder="Prénom"
                  aria-label="Prénom"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => handleName()}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
              {myChild.map(e => (
                <div>Mon enfant : {e} </div>
              ))}
              {notMyChild.map(e => (
                <div>L'enfant de la co-famille : {e} </div>
              ))}
            </div>
          ) : (
            ''
          )}
           <Link to="/">
          <p className="simFormReturn" onClick={() => restartCalendar()}>Retour aux simulateurs
         </p> 
        </Link>
        </div>
      )}

      <div className="container-fluid d-flex flex-column justify-content-center familyFormComponent">
        {/* enfants multiples en garde co-famille : calendrier apparait  */}
        {count === nbEnfants &&
        count2 === totalEnfants - nbEnfants &&
        count2 !== 0 ? (
          <FamilyAgenda/>
        ) : (
          ''
        )}

        {/* enfants en garde partagée : calendrier apparait  */}
        {count === totalEnfants && count2 === 0 && gardeAlternee === "true" ? (
          <FamilyAgenda />
        ) : (
          ''
        )}
      </div>
      <div></div>
    </div>
  )
}

export default FamilyForm
