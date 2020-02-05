import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Header from './Header'
import Simform from './SimForm'
import FamilyForm from './FamilyForm'
import logo from '../../src/assets/noonoo1.svg'
import logoRappel from '../assets/alerte2.svg'
import logoOutil from '../assets/outil_rh_2.svg'
import logoPaie from '../assets/paie2.svg'
import logoContrat from '../assets/contractualisation.svg'
import imagePaie from '../assets/serein_illustration.svg'
import imageRappel from '../assets/Smartphonecontrol_illustration.svg'
import imageOutil from '../assets/outilRH_illustration.svg'
import imageContractualisation from '../assets/utilisateur_illustration.svg'
import './Home.css'

const Home = () => {
  return (
    <div className="Homepage">

      
      {/* Introduction */}

      <article className="container-fluid articleDescription">
        <div className="row justify-content-center wrap">
          <div className="col-10 col-xl-6 d-flex flex-column justify-between articleVision">

            <div>
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
              </ol>
            </div>

            <div
              id="carouselExampleIndicators"
              className="carousel slide textCarousel"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item active"
                  data-interval="10000"
                >
                  <h3>
                    Manque de temps pour gérer correctement la paie et l’administratif de votre garde à domicile ?
                  </h3>
                </div>
                <div className="carousel-item" data-interval="10000">
                  <h3>Peur de ne pas prendre soin de votre garde à domicile comme elle prend soin de vos enfants ?</h3>
                </div>
              </div>
            </div>


            <div>
              <h2>Nous construisons la solution qu’il vous faut !
              </h2>
              <p>Pour découvrir notre service de gestion administrative pour les gardes à domicile en avant-première, laissez-nous votre adresse mail. Nous vous donnerons un accès prioritaire au service avant sa sortie.</p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  value=''
                  class="form-control"
                  placeholder="Votre e-mail"
                  aria-label="email"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Demander mon accès
                  </button>
                </div>
              </div>
              

            </div>
          </div>

          <div className="col-4 d-flex justify-content-center align-items-center articleMission">
            <div className="logo">
              <img
                className="placeholderLogo"
                src={logo}
                alt="easynoonoo logo"
              ></img>
            </div>
          </div>
        </div>
      </article>

      {/* BANNIERE  */}

      <div className=' row col-12 d-flex flex-column justify-content-center align-items-center bannerIntro'>
        <h2>Une solution RH pour les particuliers employeur</h2>
        <h3>Concentrez-vous sur l’essentiel grâce à un logiciel pour la gestion de la paie et de votre garde à domicile.</h3>
        <div className='row'>
          <img src={logoPaie} className="HomepageIcon" alt='logo paie' />
          <img src={logoContrat} className="HomepageIcon" alt='logo contrat' />
          <img src={logoOutil} className="HomepageIcon" alt='logo assistant rh' />
          <img src={logoRappel} className="HomepageIcon" alt='logo outil rh' />
        </div>
      </div>

      {/* LA PAIE */}

      <div id="pajemploi" className="container-fluid screen">
        <div className="desc">
          <div className="row d-flex justify-content-center flex-wrap-reverse">
            <div className="col-10 col-lg-6 d-flex justify-content-center flex-column">
              <div className='row'>
                <img
                  className="HomepageIcon"
                  src={logoPaie}
                  alt="logo contrat"
                />
                <h2>LA PAIE</h2>

              </div>
              <h3>Aucune erreur, aucun retard.</h3>


              <p>
                Automatiser la paie de votre salarié.e ainsi que vos déclarations fiscales. Easynoonoo s’occupe de tout !
              </p>
            </div>
            <div className="col-10 col-lg-5 d-flex justify-content-center align-items-center homepageTitle">
              <img
                className='imgHome'
                src={imagePaie}
                alt=""
              />

            </div>
          </div>
        </div>
      </div>

      {/*LA CONTRACTUALISATION*/}

      <div id="contract" className="container-fluid screen screenv2">
        <div className="desc descColor">
          <div className="row d-flex justify-content-center flex-wrap">
            <div className="col-10 col-lg-5 d-flex justify-content-center align-items-center homepageTitle">

              <img
                className='imgHome'
                src={imageContractualisation}
                alt="img contract"
              />
            </div>
            <div className="col-10 col-lg-6 d-flex justify-content-center flex-column">
              <div className='row'>
                <img
                  className="HomepageIcon"
                  src={logoContrat}
                  alt="logo contrat"
                />
                <h2>LA CONTRACTUALISATION</h2>
              </div>
              <h3>Un contrat sur mesure</h3>
              <p>
                Générer facilement votre contrat en fonction de votre situation. Profitez de l’expertise des avocats spécialistes partenaires d’Easynoonoo sans avoir à payer les honoraires !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OUTIL RH */}

      <div className="container-fluid screen" id="conge">
        <div className="desc">
          <div className="row d-flex justify-content-center flex-wrap-reverse">
            <div className="col-10 col-lg-6 d-flex justify-content-center flex-column">
              <div className='row'>
                <img
                  className="HomepageIcon"
                  src={logoOutil}
                  alt="logo contrat"
                />
                <h2>UN OUTIL RH</h2>
              </div>
              <h3>Solution de gestion complète.</h3>
              <p>
                On ne vous évitera pas forcément les discussions
                difficiles avec votre garde d'enfants, mais à
                Easynoonoo nous vous offrons une fonctionnalité pour
                simplifier la prise de congés et garder à jour le
                compteur en prenant en compte toutes les subtilités
                légales, même (et surtout!) celles dont vous n'avez
                pas entendu parler.
              </p>
            </div>
            <div className="col-10 col-lg-5 d-flex justify-content-center align-items-center homepageTitle">
              <img
                className="imgHome"
                src={imageOutil}
                alt="image outil"
              />

            </div>
          </div>

        </div>
      </div>

      {/* ASSISTANT PERSONNEL RH */}

      <div className="container-fluid screen screenv2" id="rappel">
        <div className="desc descColor">
          <div className="row d-flex justify-content-center flex-wrap">
            <div className="col-10 col-lg-5 d-flex justify-content-center align-items-center homepageTitle">
              <img
                className="imgHome"
                src={imageRappel}
                alt="logo rappel"
              />

            </div>
            <div className="col-10 col-lg-6 d-flex justify-content-center flex-column">
              <div className='row'>
                <img
                  className="HomepageIcon"
                  src={logoRappel}
                  alt="logo contrat"
                />
                <h2>ASSISTANT PERSONNEL RH</h2>
              </div>
              <h3>Rappels de vos obligations.</h3>

              <p>
                Devenez un employeur serein. Easynoonoo vous rappellera les dates clefs et vous informera des évolutions légales qui impactent la relation avec votre garde d’enfant.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULATEUR */}
      <div className='row justify-content-center'>
        <h2 id="simulateur" className="h2Simulateur col-12">
          Nos simulateurs gratuits pour vous aider à démarrer
      </h2>
        <h3 className='h3Title col-8'>Avant de vous engager avec une garde à domicile, estimez votre coût. De la même manière, testez nos services avant de nous engager ensemble !</h3>
      </div>


      <div className="container-fluid simulateur">
        <div className="row d-flex justify-content-center wrap">
          <div className="col-10 col-lg-5 d-flex flex-column justify-content-between align-items-center simulateurDescription">
            <h3>Estimer le coup de garde à domicile</h3>
            <p>
              {' '}
              Besoin d’estimer le coût de la garde à domicile ou de simuler l’impact d’un changement de situation, notre simulateur est là pour vous aider{' '}
            </p>

            <Link to="/familyform">
              <input
                type="button"
                className="simulateurbtn"
                value="Simulez votre coût"
              />
            </Link>
          </div>
          <div
            className="col-10 col-lg-5 d-flex flex-column justify-content-between align-items-center simulateurDescription"
            id="simuDesc2"
          >
            <h3>Calculer votre part en cas de garde partagée</h3>
            <p>
              {' '}
              Entre des rythmes de garde qui changent au cours de l’année (période scolaire et vacances, par exemple) et des horaires différents d’une famille à l’autre, estimez la part des heures de garde à votre charge{' '}
            </p>

            <Link to="/simform">
              <input
                type="button"
                id="simulateurBtn2"
                className="simulateurbtn"
                value="Calculez votre part"
              />
            </Link>
          </div>
        </div>
      </div>



    </div>
  )
}

export default withRouter(Home)
