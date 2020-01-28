import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Simform from './SimForm'
import FamilyForm from './FamilyForm'
import logo from '../../src/assets/noonoo1.svg'
import logoRappel from '../assets/schedule-24px.svg'
import logoConge from '../assets/agenda.svg'
import logoContrat from '../assets/contrat.svg'
import logoFinContrat from '../assets/fin-contrat.svg'
import logoDeclaration from '../assets/description-24px.svg'
import './Home.css'


const Home = () => {

    return (
        <div className='Homepage'>

            {/* Introduction */}

            <article className='container-fluid articleDescription'>
                <div className='row justify-content-center wrap'>
                    <div className='col-10 col-xl-6 d-flex flex-column justify-between articleVision'>
                        <h2>Introduction</h2>

                        <div>
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                
                            </ol>
                        </div>

                        <div id="carouselExampleIndicators" className="carousel slide textCarousel" data-ride="carousel">

                            <div className="carousel-inner">
                                <div className="carousel-item active" data-interval="10000">
                                    <p>
                                        Vous souhaitez embaucher ou vous embauchez une garde à domicile ? Félicitations! Vous voilà promu DRH et à vous les responsabilités associés : paie, gestion des congés, déclarations URSSAF, etc...
                                        <br/><br/>                                    
                                        Easynoonoo est votre plateforme paie et RH dédiée à la gestion de votre garde à domicile. Elle vous libère de la complexité de cette gestion tout au long de la durée de votre contrat.
                                        <br/><br/>                                    
                                        Easynoonoo est le résultat de nombreuses frustrations et incompréhensions de leurs créateurs durant leur propre expérience dans l'emploi d'une garde à domicile. Nous avons tout mis à plat pour que vous puissiez sereinement et rapidement traiter ce sujet crucial, en vous évitant de potentiels problèmes légaux et/ou financiers par manque de temps ou de connaissance
                                    </p>
                                </div>
                                <div className="carousel-item" data-interval="10000">
                                    <p>Easynoonoo propose les services suivants:</p>
                                    <ul>
                                        <li><a href="#simulateur">Simulateurs</a></li>
                                        <li><a href="#contract">Contrat</a></li>
                                        <li><a href="#pajemploi">Déclaration Pajemploi et fiche de paie</a></li>
                                        <li><a href="#fincontrat">Fin de contrat</a></li>
                                        <li><a href="#conge">Gestion des congés et absences</a></li>
                                        <li><a href="#rappel">Rappels</a></li>
                                    </ul>
                                    <p>Easynoonoo est l'outil pour retrouver de la sérénité dans la gestion, vous éviter des tracas administratifs et soulager (un peu) votre charge mentale.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-4 d-flex justify-content-center align-items-center articleMission'>
                        <div className='logo'>
                            <img className='placeholderLogo' src={logo} alt='easynoonoo logo'></img>
                        </div>
                    </div>
                </div>

            </article>

            {/* SIMULATEUR */}

            <h2 id='simulateur' className='h2Simulateur'>Simulateurs</h2>

            <div className='container-fluid simulateur'>
                <div className='row d-flex justify-content-center wrap'>
                    <div className='col-10 col-lg-5 d-flex flex-column justify-content-between align-items-center simulateurDescription'>
                        <h3>Calculer mon taux de répartition</h3>
                        <p> Un calculateur pour définir la répartition du coût de la garde. Nous l'avons vécu, le taux de répartition ne se limite pas forcément à 50% : enfants scolarisés, vacances ou mercredi chez les grands-parents, gardes alternées beaucoup d'élèments vont influencer les heures de garde de chaque enfants, de chaque familles. Définir un taux équitable pour les deux familles permet de d'établir une relation saine entre les familles. Nous vous offrons un outil pour simuler vos besoins et calculer ce taux. </p>

                        <Link to='/familyform'><input type='button' className='simulateurbtn' value='Essayer' /></Link>
                    </div>
                    <div className='col-10 col-lg-5 d-flex flex-column justify-content-between align-items-center simulateurDescription' id='simuDesc2'>
                        <h3>Calculer les coûts de ma nounou</h3>
                        <p> Un simulateur du coût de la garde qui clarifie le salaire reçu par votre garde à domicile, vos coûts, les aides et crédits d'impôt auxquels vous avez droit en fonction de vos besoin. Plus de confusion entre salaire brut, net, montants à charge pour l'employeur, heures supplémentaires et les aides! </p>

                        <Link to='/simform'><input type='button' id='simulateurBtn2' className='simulateurbtn' value='Essayer' /></Link>
                    </div>
                </div>                
            </div>


            {/* CONTRAT */}


            <div id='contract' className='container-fluid screen screenv2' >
                <div className='desc descColor'>

                    <div className='row d-flex justify-content-center flex-wrap'>
                        <div className='col-10 col-lg-4 d-flex justify-content-center align-items-center homepageTitle'>
                            <img className='HomepageIcon' src={logoContrat} alt='logo contrat' />
                            <h2> Contrat.</h2>
                        </div>
                        <div className='col-10 col-lg-6 d-flex justify-content-center'>
                            <p>
                                Créer son contrat de garde à domicile devient très simple avec Easynoonoo. Nous vous proposons un parcours de questions pour définir un contrat clair et intelligible, fait sur mesure. Après validation de votre contrat, il est prêt à être signé par les parties et votre espace de gestion est automatiquement paramétré.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAJEMPLOI */}


            <div id='pajemploi' className='container-fluid screen'>
                <div className='desc'>
                    <div className='row d-flex justify-content-center flex-wrap-reverse'>
                        <div className='col-10 col-lg-6 d-flex justify-content-center'>
                            <p>
                                Chaque fin de mois, c'est le moment de la déclaration et de la fiche de paie. Pajemploi vous demande un salaire net horaire, le salaire net mensuel, des heures, mais êtes-vous certains de ce que vous remplissez ?
                                <br/><br/>Easynoonoo vous calcule automatiquement ces montants en fonction de la situation du mois écoulé et de votre contrat. Nous vous aidons également à remplir votre déclaration.
                                <br/><br/> Légalement, l'employeur doit fournir une fiche de paie à son employé. Vous vous dites que Pajemploi le fait et que tout est bon... Erreur, Pajemploi ne calcule pas l'exonération sur les heures supplémentaires, si vous versez une prime de panier repas, impossible de l'ajouter. Enfin, le suivi des congés doit y être annoté à la main et signé par les parties! Détendez-vous! Nous faisons tout celà pour vous et nous mettons la fiche de paie à disposition de votre nounou.
                            </p>
                        </div>
                        <div className='col-10 col-lg-4 d-flex justify-content-center align-items-center homepageTitle'>
                            <img className='HomepageIcon' src={logoDeclaration} alt='' />
                            <h2>Déclaration Pajemploi et fiche de paie.</h2>
                        </div>
                    </div>

                </div>
            </div>

            {/* FIN CONTRAT */}

            <div className='container-fluid screen screenv2' id='fincontrat'>
                <div className='desc descColor'>


                    <div className='row d-flex justify-content-center flex-wrap'>
                        <div className='col-10 col-lg-4 d-flex justify-content-center align-items-center homepageTitle'>
                            <img className='HomepageIcon' src={logoFinContrat} alt='logo fin contrat' />
                            <h2>Fin de contrat.</h2>
                        </div>
                        <div className='col-10 col-lg-6 d-flex justify-content-center'>
                            <p>
                                Un évènement de vie arrive et vous devez vous séparer de votre garde à domicile. Et là, le vertige vous atteint: Quel est la durée du préavis? Quelles sont les démarches? Comment rédiger les courriers? Comment calculer les indemnités et avec quelles données? Quels documents remettre à mon employé?
                                <br/><br/> Easynoonoo est là. Comme nous vous avons accompagnés, nous disposons des informations clées pour établir tout celà et vous fournir les clés pour naviguer dans ces méandres.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* CONGE */}

            <div className='container-fluid screen' id='conge'>
                <div className='desc'>
                    <div className='row d-flex justify-content-center flex-wrap-reverse'>                       
                        <div className='col-10 col-lg-6 d-flex justify-content-center'>
                            <p>
                                On ne vous évitera pas forcément les discussions difficiles avec votre garde d'enfants, mais à Easynoonoo nous vous offrons une fonctionnalité pour simplifier la prise de congés et garder à jour le compteur en prenant en compte toutes les subtilités légales, même (et surtout!) celles dont vous n'avez pas entendu parler.
                            </p>
                        </div>
                        <div className='col-10 col-lg-4 d-flex justify-content-center align-items-center homepageTitle'>
                            <img className='HomepageIcon' src={logoConge} alt='logo agenda' />
                            <h2>Gestion des congés et des absences.</h2>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center'>
                        
                    </div>
                </div>
            </div>

            {/* RAPPELS */}

            <div className='container-fluid screen screenv2' id='rappel'>
                <div className='desc descColor'>
                    <div className='row d-flex justify-content-center flex-wrap'>
                        <div className='col-10 col-lg-4 d-flex justify-content-center align-items-center homepageTitle'>
                            <img className='HomepageIcon' src={logoRappel} alt='logo rappel' />
                            <h2>Rappels.</h2>
                        </div>
                        <div className='col-10 col-lg-6 d-flex justify-content-center'>
                            <p>
                                En tant qu'employeur, vous êtes soumis aux mêmes obligations légales que les entreprises. Mais vous avez déjà une activité qui vous occupe la journée, vous n'avez pas le temps pour penser à ça !
                                <br/><br/>Easynoonoo est là pour vous rappeler certaines dates clés, vous informez des changements qui vous impacterez dans votre relation avec votre garde à domicile. Vous avez ainsi tous les clés en main pour éviter les écueils
                            </p>
                        </div>
                    </div>

                </div>
            </div>




        </div>
    )
}


export default Home