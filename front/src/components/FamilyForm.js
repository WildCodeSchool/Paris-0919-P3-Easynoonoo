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

  //answers 1 2 3
  const [totalEnfants, setTotalEnfants] = useState(initialAnswer1) //total children
  const [nbEnfants, setNbEnfants] = useState(initialAnswer2) // own children
  const [gardeAlternee, setGardeAlternee] = useState(initialAnswer3) // for divorcee

  // children's names
  const [myChild, setmyChild] = useState([])
  const [notMyChild, setNotMyChild] = useState([])

  // state intermédiaire qui contient la valeur du prénom dans l'input
  const [firstname, setFirstname] = useState('')

  // state qui permet de bloquer l'ajout d'enfant
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  // state to show the Calendar
  const [showCalendar, setShowCalendar] = useState(false)

  // state to hide questions ?

  //store the data in local storage
  useEffect(() => {
    window.localStorage.setItem('totalEnfants', totalEnfants)
    window.localStorage.setItem('nbEnfants', nbEnfants)
    window.localStorage.setItem('gardeAlternee', gardeAlternee)
    window.localStorage.setItem('myChild', JSON.stringify(myChild)) //transforme la valeur en strings dans un tableau
    window.localStorage.setItem('notMyChild', JSON.stringify(notMyChild))
    window.localStorage.setItem('items', JSON.stringify([]))
    window.localStorage.setItem('allChildren', JSON.stringify([]))
  }, [totalEnfants, nbEnfants, gardeAlternee, myChild, notMyChild, showCalendar]) //callback run if only the answers change

  // 1. stocke la nouvelle valeur de l'input dans la state myChild
  // 2. réinitialise firstname à vide
  // 3. écoute la valeur de l'input avec Count
  // 4. + cas pour l'enfant unique

  const handleName = () => {
    if (firstname != '') {
      if (
        (count < totalEnfants && nbEnfants == 0) ||
        (count < nbEnfants && nbEnfants != 0)
      ) {
        setmyChild([...myChild, firstname])
        setFirstname('')
        setCount(count + 1)

      } else {
        if (count2 < totalEnfants - nbEnfants && nbEnfants > 0) {
          setNotMyChild([...notMyChild, firstname])
          setFirstname('')
          setCount2(count2 + 1)

        } else {
          return alert("Il n'y a plus d'enfants à ajouter")
        }
      }

    } else {
      return alert("Veuillez entrer un prénom")
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
    <div className="familyForm ">



      {showCalendar == true ? (
        '' //if calendar appears, questions + input disappear
      ) : (
          <div className="zifamosoSimulateur container-fluid ">
            <h2>Simulation de garde partagée</h2>
            {/* question 1 toujours visible + envoi de la valeur dans le state answers1 + converti la valeur obtenue en number*/}
            <div className="form-group">
              <label>
                Au total combien d'enfants sont gardés par votre nounou ?
              </label>
              <input
                className="form-control "
                type="number"
                value={totalEnfants}
                onChange={e =>
                  setTotalEnfants(parseInt(e.target.value, 10))
                }
                onClick={() => restart1()}
                min="1"
                max="8"
              />
            </div>

            {/* si on a plus d'un enfant question 2 apparait + si on a moins de 4 enfants */}
            {totalEnfants > 1 && totalEnfants <= 4 ? (

              <div class="form-group">

                <label>
                  Parmi ces {totalEnfants} enfants, combien sont de votre famille ?
                </label>
                <input
                  class="form-control"
                  type="number"
                  value={nbEnfants}
                  onChange={e =>
                    setNbEnfants(parseInt(e.target.value, 10))
                  }
                  onClick={() => restart2()}
                  min="1"
                  max={totalEnfants}
                />
              </div>

            ) : (
                ''
              )}

            {/* si on a plus de 4 enfants, bloquer le max d'enfants à 4 */}
            {totalEnfants > 4  ? (

              <div class="form-group">

                <label>
                  Parmi ces {totalEnfants} enfants, combien sont de votre famille ?
  </label>
                <input
                  class="form-control"
                  type="number"
                  value={nbEnfants}
                  onChange={e =>
                    setNbEnfants(parseInt(e.target.value, 10))
                  }
                  onClick={() => restart2()}
                  min="1"
                  max="4"
                />
              </div>

            ) : (
                ''
              )}

            {/* question 3 avec un radio check oui/non : garde partagée avec ex si plusieurs enfants */}

            {totalEnfants === nbEnfants && totalEnfants > 1 ? (
              <div className="question3">
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
              <div className=" question4">
                <p>Comment s'appelle l'enfant ?</p>
                <div className="input-group mb-3 ">

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
                <div className='container-fluid arrayNameChildren '>
                  <div className='row familyFormHeaderName'>Mon enfant</div>
                  {myChild.map(e => (
                    <div className='row blocName'> {e} </div>
                  ))}
                </div>
              </div>
            ) : (
                ''
              )}

            {totalEnfants === nbEnfants && gardeAlternee === "true" ? (
              <div className="question4">
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

                <div className='container-fluid arrayNameChildren '>
                  <div className='row familyFormHeaderName'>Mes enfants</div>
                  {myChild.map(e => (
                    <div className='row blocName'> {e} </div>
                  ))}
                </div>
              </div>
            ) : (
                ''
              )}
            {nbEnfants < totalEnfants && nbEnfants !== 0 ? (
              <div className="question4">
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

                <div className='container-fluid arrayNameChildren '>
                  <div className='row familyFormHeaderName'>Mes enfants</div>
                  {myChild.map(e => (
                    <div className='row blocName'> {e} </div>
                  ))}
                </div>

                {myChild.length == nbEnfants && totalEnfants - nbEnfants >= 1 ?
                  (
                    <div className='container-fluid arrayNameChildren'>
                      <div className='row familyFormHeaderName'>Les enfants de la co-famille</div>
                      {notMyChild.map(e => (
                        <div className='row blocName'> {e} </div>
                      ))}
                    </div>
                  ) : ''}
              </div>
            ) : (
                ''
              )}

            <div className="container-fluid d-flex justify-content-end familyFormComponent">
              {/* enfants multiples en garde co-famille : calendrier apparait  */}
              {count === nbEnfants &&
                count2 === totalEnfants - nbEnfants &&
                count2 !== 0 && showCalendar == false ? (
                  <div class="input-group-append">
                    <button
                      className="btn btn-outline-secondary buttonPlanning"
                      type="button"
                      id="button-addon2"
                      onClick={() => setShowCalendar(true)}
                    >
                      Suivant
                    </button>
                  </div>
                ) : (
                  ''
                )}

              {/* enfants en garde partagée : calendrier apparait  */}
              {count === totalEnfants && count2 === 0 && gardeAlternee === "true" && showCalendar == false ?
                <div class="input-group-append">
                  <button
                    className="btn btn-outline-secondary buttonPlanning"
                    type="button"
                    id="button-addon2"
                    onClick={() => setShowCalendar(true)}
                  >
                    Suivant
                  </button>
                </div>

                :
                ''
              }
            </div>






            <Link to="/">
              <p className="simFormReturn" onClick={() => restartCalendar()}>Retour aux simulateurs
              </p>
            </Link>
          </div>
        )}





      {showCalendar ? <div className='container-fluid'><FamilyAgenda /></div> : ''}
    </div>
  )
}

export default FamilyForm
