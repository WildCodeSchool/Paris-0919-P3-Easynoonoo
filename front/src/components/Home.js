import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import contract from '../../src/assets/contract.png'
import money2 from '../../src/assets/money2.png'
import calendar from '../../src/assets/calendar.png'
import logo from '../../src/assets/noonoo1.svg'
import Simform from './SimForm'
import FamilyForm from './FamilyForm'
import './Home.css'


const Home = () => {

    return (
        <div className='Homepage'>

            {/* Introduction */}

            <article className='articleDescription'>
                <div className='articleVision'>
                    <h2>Introduction</h2>
                    <div id="carouselExampleIndicators" className="carousel slide articleDescription" data-ride="carousel">
                        <ol className="carousel-indicators homeIndicatorsCarousel">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    
                        </ol>
                        <div className="carousel-inner b">
                            <div className="carousel-item active" data-interval="10000">
                                <p>
                                    Vous souhaitez embaucher ou vous embauchez une garde à domicile ? Félicitations! Vous voilà promu DRH et à vous les responsabilités associés : paie, gestion des congés, déclarations URSSAF, etc...
                                </p>
                                 <p>
                                    Easynoonoo est votre plateforme paie et RH dédiée à la gestion de votre garde à domicile. Elle vous libère de la complexité de cette gestion tout au long de la durée de votre contrat. 
                                </p>
                                <p>
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
                                    <li><a href="#conge">Gestion des congés et absences</a> </li>
                                    <li>Rappels</li>
                                </ul>
                                <p>Easynoonoo est l'outil pour retrouver de la sérénité dans la gestion, vous éviter des tracas administratifs et soulager (un peu) votre charge mentale.</p>
                            </div>
    
                        </div>
                
                    </div>
                </div>

                

                <div className='articleMission'>
                    <div className='logo'>
                    <img className='placeholderLogo' src={logo} alt='placeholder for easynoonoo logo'></img>
                    </div> 
                </div>
                
            </article>

            {/* SIMULATEUR */}

            <h2 id='simulateur' className ='h2Simulateur'>Simulateurs</h2>
            <p>Easynoonoo propose deux outils en accès gratuits:</p>

            <div className='simulateur'>   

                <div className='simulateurDescription'>
                    <h3>Calculer mon taux de répartition</h3>
                    <p> Un calculateur pour définir la répartition du coût de la garde. Nous l'avons vécu, le taux de répartition ne se limite pas forcément à 50% : enfants scolarisés, vacances ou mercredi chez les grands-parents, gardes alternées beaucoup d'élèments vont influencer les heures de garde de chaque enfants, de chaque familles. Définir un taux équitable pour les deux familles permet de d'établir une relation saine entre les familles. Nous vous offrons un outil pour simuler vos besoins et calculer ce taux. </p>
                                  
                    <Link to='/familyform'><input type='button' className='simulateurbtn' value='Essayer' /></Link>
                </div>
                
                <div className='simulateurDescription' id ='simuDesc2'>
                    <h3>Calculer les coûts de ma nounou</h3>
                    <p> Un simulateur du coût de la garde qui clarifie le salaire reçu par votre garde à domicile, vos coûts, les aides et crédits d'impôt auxquels vous avez droit en fonction de vos besoin. Plus de confusion entre salaire brut, net, montants à charge pour l'employeur, heures supplémentaires et les aides! </p>
                                   
                    <Link to='/simform'><input type='button' id='simulateurBtn2' className='simulateurbtn' value='Essayer' /></Link>
                </div>                        
            </div>


            {/* CONTRAT */}


            <div className='screen' id='screen2Bg'>
                <div className='desc' id='descColor'>
                    <h3 id='contract'> Contrat.</h3>
                    <p>
                    Créer son contrat de garde à domicile devient très simple avec Easynoonoo. Nous vous proposons un parcours de questions pour définir un contrat clair et intelligible, fait sur mesure. Après validation de votre contrat, il est prêt à être signé par les parties et votre espace de gestion est automatiquement paramétré.
                    </p>
                </div>
                
                <img className='screenshot2' src='https://via.placeholder.com/800x500/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                    </img>                    
                
                
            </div> 


            <div id='pajemploi' className='screen'>
                <img className='screenshot1' src='https://via.placeholder.com/800x500/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                </img>
                <div className='desc'>
                    <h3>Déclaration Pajemploi et fiche de paie.</h3>
                    <p>
                        Chaque fin de mois, c'est le moment de la déclaration et de la fiche de paie. Pajemploi vous demande un salaire net horaire, le salaire net mensuel, des heures, mais êtes-vous certains de ce que vous remplissez ?
                    </p>
                    <p>
                        Easynoonoo vous calcule automatiquement ces montants en fonction de la situation du mois écoulé et de votre contrat. Nous vous aidons également à remplir votre déclaration.

                    </p>
                    <p>
                        Légalement, l'employeur doit fournir une fiche de paie à son employé. Vous vous dites que Pajemploi le fait et que tout est bon... Erreur, Pajemploi ne calcule pas l'exonération sur les heures supplémentaires, si vous versez une prime de panier repas, impossible de l'ajouter. Enfin, le suivi des congés doit y être annoté à la main et signé par les parties! Détendez-vous! Nous faisons tout celà pour vous et nous mettons la fiche de paie à disposition de votre nounou.
                    </p>
                </div>
            </div>


            <div className='screen' id='screen2Bg'>
                <div className='desc' id='descColor'>
                    <h3 id='fincontrat'> Fin de contrat.</h3>
                    <p>
                    Un évènement de vie arrive et vous devez vous séparer de votre garde à domicile. Et là, le vertige vous atteint: Quel est la durée du préavis? Quelles sont les démarches? Comment rédiger les courriers? Comment calculer les indemnités et avec quelles données? Quels documents remettre à mon employé?
                    </p>
                    <p>
                    Easynoonoo est là. Comme nous vous avons accompagné, nous disposons des informations clés pour établir tout celà et vous fournir les clés pour naviguer dans ces méandres.
                    </p>
                </div>
                
                <img className='screenshot2' src='https://via.placeholder.com/800x500/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                    </img>                    
                
                
            </div> 

            <div className='screen' id='conge'>
                <img className='screenshot1' src='https://via.placeholder.com/800x500/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                </img>
                <div className='desc'>
                    <h3>Gestion des congés et des absences.</h3>
                    <p>
                        On ne vous évitera pas forcément les discussions difficiles avec votre garde d'enfants, mais Easynoonoo nous vous offrons une fonctionnalité pour simplifier la prise de congés et garder à jour le compteur en prenant en compte toutes les subtilités légales, même (et surtout!) celles dont vous n'avez pas entendu parler.
                    </p>
                    
                </div>
            </div>

            <div className='screen' id='screen2Bg'>
                <div className='desc' id='descColor'>
                    <h3 id='h3Color'>Rappels.</h3>
                    <p>
                    En tant qu'employeur, vous êtes soumis aux mêmes obligations légales que les entreprises. Mais vous avez déjà une activité qui vous occupe la journée, vous n'avez pas le temps pour penser à ça! 
                    </p>
                    <p>
                    Easynoonoo est là pour vous rappeler certaines dates clés, vous informez des changements qui vous impacterez dans votre relation avec votre garde à domicile. Vous avez ainsi tous les clés en main pour éviter les écueils
                    </p>
                </div>
                
                <img className='screenshot2' src='https://via.placeholder.com/800x500/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                    </img>                    
                
                
            </div> 


            

        </div>
    )
}


export default Home