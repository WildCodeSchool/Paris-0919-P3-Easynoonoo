const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const moment = require('moment');

const { tauxChargesEmployes } = require('./models/chargesEmployes')
const { tauxChargesEmployeurs } = require('./models/chargesEmployeurs')
const { cmgs } = require('./models/cmgs')
const { aides } = require('./models/aides')

const port = 4000

const app = express()
app.use(cors())
app.use(bodyParser.json())

// ____________ REMOTE DB ROUTE ______________

const dbRoute =
  'mongodb+srv://easynoonoo:easynoonoo@cluster0-mznsf.azure.mongodb.net/easynoonooDB?retryWrites=true&w=majority'

// ____________ CHECK YOUR CONNECTION TO MONGO DB REMOTE ______________

mongoose
  .connect(dbRoute, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(error => console.log(error))

/*    TAUX EMPLOYES    */

app.post('/api/calculscharges', function (req, res) {

  /*---------------------- ROUTE CHARGES EMPLOYES ----------------------------*/

  let salaireBrutMensuel
  let heuresMensuellesMajorees
  let heuresRecuperation
  let assietteCsgRdsMensuel
  let heuresMensuelles
  let assietteCsgRdsHoraire
  let chargesPatronalesFamilleA
  let chargesSalarialesFamilleA
  let chargesPatronalesFamilleB
  let chargesSalarialesFamilleB
  let chargesPatronalesSSFamilleA
  let chargesPatronalesSSFamilleB
  let netMensuelFamilleA
  let netMensuelFamilleB
  let coutPatronalFamilleA
  let coutPatronalFamilleB
  let cmgFamilleA
  let cmgFamilleB
  let primePanierRepasFamilleA
  let primePanierRepasFamilleB
  let remboursementMensuelTransportFamilleA
  let remboursementMensuelTransportFamilleB
  let creditImpotAnnuelFamilleA
  let creditImpotAnnuelFamilleB
  let creditImpotMensuelFamilleA
  let creditImpotMensuelFamilleB
  let netMensuelTotal
  let netHoraire
  let brutAnnuelTotal
  let brutAnnuelFamilleA
  let brutAnnuelFamilleB
  let brutMensuelFamilleA
  let brutMensuelFamilleB
  let netAnnuelTotal
  let chargesTotal
  let trancheMensuelSS
  let netMensuelAvantageFamilleA
  let netMensuelAvantageFamilleB
  let montantAPayerFamilleA
  let montantAPayerFamilleB
  let deductionForfaitaireChargesSocialesFamilleA
  let deductionForfaitaireChargesSocialesFamilleB
  let aidesPajeFamilleA
  let aidesPajeFamilleB
  let trancheAFamilleA
  let trancheAFamilleB
  let trancheB
  let trancheC
  let trancheD
  let montantAPayerPostCreditImpotFamilleA
  let montantAPayerPostCreditImpotFamilleB
  let baseCommuneChargesSalariales


  /* ---------------- DB variables 'aides' ---------------- */

  let abattementParHeure
  let tauxDeParticipationCotisationsSociales
  let plafondParticipationCotisation03
  let plafondParticipationCotisation36
  let plafondExonerationsHeuresSupp
  let plafondCreditImpot
  let majorationParEnfantACharges
  let maxCreditImpot
  let tauxCreditImpot
  let majorationPremiereAnneeEmploiADomicile
  let dateDebutAnneeAides

  /* ---------------- DB variables 'cmg' ---------------- */

  let cmgCouplePalier1
  let cmgCouplePalier2
  let cmgCouplePalier3
  let cmgCouplePalier4
  let cmgCouplePalier5
  let cmgCouplePalier6
  let cmgParentIsolePalier1
  let cmgParentIsolePalier2
  let cmgParentIsolePalier3
  let cmgParentIsolePalier4
  let cmgParentIsolePalier5
  let cmgParentIsolePalier6
  let ageEnfant1
  let ageEnfant2
  let coupleRevenusA
  let coupleRevenusB
  let coupleRevenusC
  let coupleRevenusD
  let coupleRevenusE
  let coupleRevenusF
  let coupleRevenusG
  let coupleRevenusH
  let parentIsoleRevenusA
  let parentIsoleRevenusB
  let parentIsoleRevenusC
  let parentIsoleRevenusD
  let parentIsoleRevenusE
  let parentIsoleRevenusF
  let parentIsoleRevenusG
  let parentIsoleRevenusH
  let tauxParentsIsole
  let dateDebutAnneeCmg
  let dateFinAnneeCmg


  /* ---------------- DB variables 'tauxchargesemployes' ---------------- */

  let maladieMaterniteInvaliditeDecesEmployes
  let assuranceVieillesseDeplafonneeEmployes
  let vieillessePlafonneeEmployes
  let cotisationSupplementaireAlsaceMoselleEmployes
  let IrcemRetraiteComplementaireTrAEmployes
  let IrcemRetraiteComplementaireTrBEmployes
  let CegTrAEmployes
  let CegTrBEmployes
  let CetTrBEmployes
  let assuranceChomageEmployes
  let IrcemPrevoyanceEmployes
  let CsgDeductibleEmployes
  let CsgNonDeductibleEmployes
  let CrdsNonDeductibleEmployes
  let exonerationDesCotisationsEmployes
  let tauxHeuresSuppEmployes
  let tauxAssietteCSG_RDSEmployes
  let PMSS
  let dateDebutAnneeEmployes
  let dateFinAnneeEmployes

  /* ---------------- DB variables 'tauxchargesemployeurs' ---------------- */

  let maladieMaterniteInvaliditeDeces
  let assuranceVieillesseDeplafonnee
  let vieillessePlafonnee
  let accidentDuTravail
  let allocationsFamiliales
  let IrcemRetraiteComplementaireTrA
  let IrcemRetraiteComplementaireTrB
  let CegTrA
  let CegTrB
  let CetTrB
  let assuranceChomage
  let IrcemPrevoyance
  let contributionSolidariteAutonomie
  let formationProfessionnelle
  let fondsNationalAideAuLogement
  let contributionAuFinancementDesOrganisationsSyndicales
  let dateDebutAnneeEmployeurs
  let joursOuvres

  const getCmgValues = () => {
    return (
      new Promise(resolve => {
        cmgs.find(
          { dateDebutAnneeCmg: req.body.dateDebutAnnee },
          function (err, taux2) {
            resolve(
              taux2.map(val => {
                cmgCouplePalier1 = val.cmgCouplePalier1
                cmgCouplePalier2 = val.cmgCouplePalier2
                cmgCouplePalier3 = val.cmgCouplePalier3
                cmgCouplePalier4 = val.cmgCouplePalier4
                cmgCouplePalier5 = val.cmgCouplePalier5
                cmgCouplePalier6 = val.cmgCouplePalier6
                cmgParentIsolePalier1 = val.cmgParentIsolePalier1
                cmgParentIsolePalier2 = val.cmgParentIsolePalier2
                cmgParentIsolePalier3 = val.cmgParentIsolePalier3
                cmgParentIsolePalier4 = val.cmgParentIsolePalier4
                cmgParentIsolePalier5 = val.cmgParentIsolePalier5
                cmgParentIsolePalier6 = val.cmgParentIsolePalier6
                ageEnfant1 = val.ageEnfant1
                ageEnfant2 = val.ageEnfant2
                coupleRevenusA = val.coupleRevenusA
                coupleRevenusB = val.coupleRevenusB
                coupleRevenusC = val.coupleRevenusC
                coupleRevenusD = val.coupleRevenusD
                coupleRevenusE = val.coupleRevenusE
                coupleRevenusF = val.coupleRevenusF
                coupleRevenusG = val.coupleRevenusG
                coupleRevenusH = val.coupleRevenusH
                parentIsoleRevenusA = val.parentIsoleRevenusA
                parentIsoleRevenusB = val.parentIsoleRevenusB
                parentIsoleRevenusC = val.parentIsoleRevenusC
                parentIsoleRevenusD = val.parentIsoleRevenusD
                parentIsoleRevenusE = val.parentIsoleRevenusE
                parentIsoleRevenusF = val.parentIsoleRevenusF
                parentIsoleRevenusG = val.parentIsoleRevenusG
                parentIsoleRevenusH = val.parentIsoleRevenusH
                tauxParentsIsole = val.tauxParentsIsole
                dateDebutAnneeCmg = val.dateDebutAnneeCmg
                dateFinAnneeCmg = val.dateFinAnneeCmg
              })
            )
          })

      })
    )
  }
  const getEmployesValues = () => {
    return (
      new Promise(resolve => {
        tauxChargesEmployes.find(
          { dateDebutAnneeEmployes: req.body.dateDebutAnnee },
          function (err, taux) {
            resolve(
              taux.map(val => {
                PMSS = val.PMSS
                tauxHeuresSuppEmployes = val.tauxHeuresSuppEmployes
                maladieMaterniteInvaliditeDecesEmployes = val.maladieMaterniteInvaliditeDecesEmployes
                assuranceVieillesseDeplafonneeEmployes = val.assuranceVieillesseDeplafonneeEmployes
                vieillessePlafonneeEmployes = val.vieillessePlafonneeEmployes
                cotisationSupplementaireAlsaceMoselleEmployes = val.cotisationSupplementaireAlsaceMoselleEmployes
                IrcemRetraiteComplementaireTrAEmployes = val.IrcemRetraiteComplementaireTrAEmployes
                IrcemRetraiteComplementaireTrBEmployes = val.IrcemRetraiteComplementaireTrBEmployes
                CegTrAEmployes = val.CegTrAEmployes
                CegTrBEmployes = val.CegTrBEmployes
                CetTrBEmployes = val.CetTrBEmployes
                assuranceChomageEmployes = val.assuranceChomageEmployes
                IrcemPrevoyanceEmployes = val.IrcemPrevoyanceEmployes
                CsgDeductibleEmployes = val.CsgDeductibleEmployes
                CsgNonDeductibleEmployes = val.CsgNonDeductibleEmployes
                CrdsNonDeductibleEmployes = val.CrdsNonDeductibleEmployes
                exonerationDesCotisationsEmployes = val.exonerationDesCotisationsEmployes
                tauxAssietteCSG_RDSEmployes = val.tauxAssietteCSG_RDSEmployes
                dateDebutAnneeEmployes = val.dateDebutAnneeEmployes
                dateFinAnneeEmployes = val.dateFinAnneeEmployes
              })
            )
          })

      })
    )
  }

  const getEmployeursValues = () => {
    return (
      new Promise(resolve => {
        tauxChargesEmployeurs.find(
          { dateDebutAnneeEmployeurs: req.body.dateDebutAnnee },
          function (err, taux1) {
            resolve(
              taux1.map(val => {
                maladieMaterniteInvaliditeDeces = val.maladieMaterniteInvaliditeDeces
                assuranceVieillesseDeplafonnee = val.assuranceVieillesseDeplafonnee
                vieillessePlafonnee = val.vieillessePlafonnee
                accidentDuTravail = val.accidentDuTravail
                allocationsFamiliales = val.allocationsFamiliales
                IrcemRetraiteComplementaireTrA = val.IrcemRetraiteComplementaireTrA
                IrcemRetraiteComplementaireTrB = val.IrcemRetraiteComplementaireTrB
                CegTrA = val.CegTrA
                CegTrB = val.CegTrB
                CetTrB = val.CetTrB
                assuranceChomage = val.assuranceChomage
                IrcemPrevoyance = val.IrcemPrevoyance
                contributionSolidariteAutonomie = val.contributionSolidariteAutonomie
                formationProfessionnelle = val.formationProfessionnelle
                fondsNationalAideAuLogement = val.fondsNationalAideAuLogement
                contributionAuFinancementDesOrganisationsSyndicales = val.contributionAuFinancementDesOrganisationsSyndicales
                dateDebutAnneeEmployeurs = val.dateDebutAnneeEmployeurs
                joursOuvres = val.joursOuvres
              })
            )
          })
      })
    )
  }
  const getAidesValues = () => {
    return (
      new Promise(resolve => {
        aides.find(
          { dateDebutAnneeAides: req.body.dateDebutAnnee },
          function (err, taux3) {
            resolve(
              taux3.map(val => {
                abattementParHeure = val.abattementParHeure
                tauxDeParticipationCotisationsSociales = val.tauxDeParticipationCotisationsSociales
                plafondParticipationCotisation03 = val.plafondParticipationCotisation03
                plafondParticipationCotisation36 = val.plafondParticipationCotisation36
                plafondExonerationsHeuresSupp = val.plafondExonerationsHeuresSupp
                plafondCreditImpot = val.plafondCreditImpot
                majorationParEnfantACharges = val.majorationParEnfantACharges
                maxCreditImpot = val.maxCreditImpot
                tauxCreditImpot = val.tauxCreditImpot
                majorationPremiereAnneeEmploiADomicile = val.majorationPremiereAnneeEmploiADomicile
                dateDebutAnneeAides = val.dateDebutAnneeAides
              })
            )
          })
      })
    )
  }
  const calculOfHeuresMensuelles = () => {
    return (
      new Promise(resolve => {
        resolve(heuresMensuelles = Math.ceil(req.body.heuresHebdo * (52 / 12)))
      })
    )
  }

  const calculHeuresMensuellesMajorees = () => {
    return (
      new Promise(resolve => {
        if (req.body.heuresSup > 8) {
          resolve(
            heuresMensuellesMajorees = Math.ceil(8 * (52 / 12)),
            heuresRecuperation = req.body.heuresSup - 8,
          )
        }
        else {
          resolve(
            heuresMensuellesMajorees = Math.ceil(req.body.heuresSup * (52 / 12)),
          )
        }
      })
    )
  }

  const calculSalaireBrutMensuel = () => {
    return (
      new Promise(resolve => {
        resolve(salaireBrutMensuel = heuresMensuelles * req.body.tauxHoraire + heuresMensuellesMajorees * req.body.tauxHoraire * tauxHeuresSuppEmployes)
      })
    )
  }

  const calculAssietteCsgRdsMensuel = () => {
    return (
      new Promise(resolve => {
        resolve(assietteCsgRdsMensuel = (tauxAssietteCSG_RDSEmployes * 0.01 * Math.min(4 * PMSS, salaireBrutMensuel) + Math.max(0, salaireBrutMensuel - 4 * PMSS)) * req.body.repartitionFamille)
      })
    )
  }

  const calculAssietteCsgRdsHoraire = () => {
    return (
      new Promise(resolve => {
        resolve(
          assietteCsgRdsHoraire = tauxAssietteCSG_RDSEmployes * 0.01 * req.body.tauxHoraire
        )
      })
    )
  }

  const calculBrutMensuelFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          brutMensuelFamilleA = req.body.repartitionFamille * salaireBrutMensuel
        )
      })
    )
  }

  const calculBrutMensuelFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          brutMensuelFamilleB = (1 - req.body.repartitionFamille) * salaireBrutMensuel
        )
      })
    )
  }

  const calculTrancheMensuelSS = () => {
    return (
      new Promise(resolve => {
        if (salaireBrutMensuel <= PMSS) {
          resolve(trancheMensuelSS = "tranche A")
        }
        else if (1 * PMSS < salaireBrutMensuel && salaireBrutMensuel <= 4 * PMSS) {
          resolve(trancheMensuelSS = "tranche B")
        }
        else if (4 * PMSS < salaireBrutMensuel && salaireBrutMensuel <= 8 * PMSS) {
          resolve(trancheMensuelSS = "tranche C")
        }
        else {
          resolve(trancheMensuelSS = "tranche D")
        }
      })
    )
  }

  const calculTranchePMSS = () => {
    return (
      new Promise(resolve => {
        resolve(
          trancheAFamilleA = Math.min((salaireBrutMensuel * req.body.repartitionFamille - 0 * PMSS), (1 * PMSS - 0 * PMSS)),
          trancheAFamilleB = Math.min((salaireBrutMensuel * (1 - req.body.repartitionFamille) - 0 * PMSS), (1 * PMSS - 0 * PMSS)),
          trancheB = Math.max(Math.min((salaireBrutMensuel - 1 * PMSS), (4 * PMSS - 1 * PMSS)), 0),
          trancheC = Math.max(Math.min((salaireBrutMensuel - 4 * PMSS), (8 * PMSS - 4 * PMSS)), 0),
          trancheD = Math.max(Math.min((salaireBrutMensuel - 8 * PMSS), (8 * PMSS)), 0)
        )
      })
    )
  }

  const calculBaseCommuneChargesSalariales = () => {
    return (
      new Promise(resolve => {
        resolve(
          baseCommuneChargesSalariales = trancheB * 0.01 * (
            IrcemRetraiteComplementaireTrBEmployes +
            CegTrBEmployes +
            CetTrBEmployes
          )
          + assietteCsgRdsMensuel * 0.01 * (
            CsgDeductibleEmployes +
            CsgNonDeductibleEmployes +
            CrdsNonDeductibleEmployes)
          + (heuresMensuellesMajorees * req.body.repartitionFamille * tauxHeuresSuppEmployes * req.body.tauxHoraire * (0.01 * exonerationDesCotisationsEmployes))
        )
      })
    )
  }

  const calculChargesSalarialesFamilleA = () => {
    return (
      new Promise(resolve => (
        resolve(
          chargesSalarialesFamilleA = Math.round(((trancheAFamilleA * 0.01 * (
            maladieMaterniteInvaliditeDecesEmployes +
            assuranceVieillesseDeplafonneeEmployes +
            vieillessePlafonneeEmployes +
            IrcemRetraiteComplementaireTrAEmployes +
            CegTrAEmployes +
            cotisationSupplementaireAlsaceMoselleEmployes * req.body.alsaceMoselle +
            assuranceChomageEmployes +
            IrcemPrevoyanceEmployes))
            + baseCommuneChargesSalariales) * 100) / 100,
        )
      ))
    )
  }

  const calculChargesSalarialesFamilleB = () => {
    return (
      new Promise(resolve => {
        if(req.body.repartitionFamille != 1){
          resolve(
            chargesSalarialesFamilleB = Math.round(((trancheAFamilleB * 0.01 * (
              maladieMaterniteInvaliditeDecesEmployes +
              assuranceVieillesseDeplafonneeEmployes +
              vieillessePlafonneeEmployes +
              IrcemRetraiteComplementaireTrAEmployes +
              CegTrAEmployes +
              cotisationSupplementaireAlsaceMoselleEmployes * req.body.alsaceMoselle +
              assuranceChomageEmployes +
              IrcemPrevoyanceEmployes))
              + baseCommuneChargesSalariales) * 100) / 100,
          )
        }
        else{
          resolve(
            chargesSalarialesFamilleB = 0
          )
        }
      })
    )
  }

  const calculNetMensuelFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          netMensuelFamilleA = brutMensuelFamilleA - chargesSalarialesFamilleA
        )
      })
    )
  }

  const calculNetMensuelFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          netMensuelFamilleB = brutMensuelFamilleB - chargesSalarialesFamilleB
        )
      })
    )
  }

  const calculChargesTotal = () => {
    return (
      new Promise(resolve => {
        resolve(
          chargesTotal = chargesSalarialesFamilleA + chargesSalarialesFamilleB
        )
      })
    )
  }

  const calculNetMensuelTotal = () => {
    return (
      new Promise(resolve => {
        resolve(
          netMensuelTotal = salaireBrutMensuel - chargesTotal
        )
      })
    )
  }

  const calculBrutAnnuelTotal = () => {
    return (
      new Promise(resolve => {
        resolve(
          brutAnnuelTotal = Math.round((salaireBrutMensuel * 12) * 100) / 100
        )
      })
    )
  }

  const calculNetAnnuelTotal = () => {
    return (
      new Promise(resolve => {
        resolve(
          netAnnuelTotal = Math.round((netMensuelTotal * 12) * 100) / 100
        )
      })
    )
  }

  const calculBrutAnnuelFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          brutAnnuelFamilleA = brutAnnuelTotal * req.body.repartitionFamille
        )
      })
    )
  }

  const calculBrutAnnuelFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          brutAnnuelFamilleB = brutAnnuelTotal * (1 - req.body.repartitionFamille)
        )
      })
    )
  }

  const calculNetAnnuelTotalFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          netAnnuelTotalFamilleA = netAnnuelTotal * req.body.repartitionFamille
        )
      })
    )
  }

  const calculNetAnnuelTotalFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(netAnnuelTotalFamilleB = netAnnuelTotal * (1 - req.body.repartitionFamille))
      })
    )
  }

  /* netHoraire = Math.round((req.body.tauxHoraire -
    ((req.body.tauxHoraire * 0.01 * (
      maladieMaterniteInvaliditeDecesEmployes +
      assuranceVieillesseDeplafonneeEmployes +
      vieillessePlafonneeEmployes +
      arrayTr[3] +
      arrayTr[0] +
      arrayTr[1] +
      arrayTr[2] +
      assuranceChomageEmployes +
      IrcemPrevoyanceEmployes))
      + (assietteCsgRdsHoraire * 0.01 * (
        CsgDeductibleEmployes +
        CsgNonDeductibleEmployes +
        CrdsNonDeductibleEmployes)))) * 100) / 100 */

  /*--------------------------CALCUL SALAIRE NET---------------------*/


  /*---------------------- ROUTE CHARGES EMPLOYEURS ----------------------------*/

  const calculBaseCommuneChargesPatronales = () => {
    return (
      new Promise(resolve => {
        resolve(
          baseCommuneChargesPatronales = trancheB * 0.01 * (
            IrcemRetraiteComplementaireTrB +
            CegTrB +
            CetTrB
          )
        )
      })
    )
  }

  const calculChargesPatronalesFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          chargesPatronalesFamilleA =
          Math.round((trancheAFamilleA * 0.01 * (
            maladieMaterniteInvaliditeDeces +
            assuranceVieillesseDeplafonnee +
            vieillessePlafonnee +
            accidentDuTravail +
            allocationsFamiliales +
            IrcemRetraiteComplementaireTrA +
            CegTrA +
            assuranceChomage +
            IrcemPrevoyance +
            contributionSolidariteAutonomie +
            formationProfessionnelle +
            fondsNationalAideAuLogement +
            contributionAuFinancementDesOrganisationsSyndicales
          ) +
            baseCommuneChargesPatronales) * 100) / 100
        )
      })
    )
  }

  const calculChargesPatronalesFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          chargesPatronalesFamilleB =
          Math.round((trancheAFamilleB * 0.01 * (
            maladieMaterniteInvaliditeDeces +
            assuranceVieillesseDeplafonnee +
            vieillessePlafonnee +
            accidentDuTravail +
            allocationsFamiliales +
            IrcemRetraiteComplementaireTrA +
            CegTrA +
            assuranceChomage +
            IrcemPrevoyance +
            contributionSolidariteAutonomie +
            formationProfessionnelle +
            fondsNationalAideAuLogement +
            contributionAuFinancementDesOrganisationsSyndicales
          ) +
            baseCommuneChargesPatronales) * 100) / 100
        )
      })
    )
  }

  const calculChargesPatronalesSSFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          chargesPatronalesSSFamilleA = Math.round(((maladieMaterniteInvaliditeDeces +
            assuranceVieillesseDeplafonnee +
            vieillessePlafonnee +
            accidentDuTravail +
            allocationsFamiliales) * salaireBrutMensuel * req.body.repartitionFamille * 0.01) * 100) / 100
        )
      })
    )
  }

  const calculChargesPatronalesSSFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          chargesPatronalesSSFamilleB = Math.round(((maladieMaterniteInvaliditeDeces +
            assuranceVieillesseDeplafonnee +
            vieillessePlafonnee +
            accidentDuTravail +
            allocationsFamiliales) * salaireBrutMensuel * (1 - req.body.repartitionFamille) * 0.01) * 100) / 100
        )
      })
    )
  }

  const calculPrimePanierRepasFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          primePanierRepasFamilleA = ((joursOuvres - req.body.joursCP - req.body.joursRecup) * (req.body.joursTravaillesSemaines / 5)) / 12 * req.body.montantRepas * req.body.repartitionFamille * 100 / 100,
        )
      })
    )
  }

  const calculPrimePanierRepasFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          primePanierRepasFamilleB = (joursOuvres - req.body.joursCP - req.body.joursRecup) * (req.body.joursTravaillesSemaines / 5) / 12 * req.body.montantRepas * (1 - req.body.repartitionFamille) * 100 / 100
        )
      })
    )
  }

  const calculRemboursementMensuelTransportFamilleA = () => {
    return (
      new Promise(resolve => {
        if (req.body.heuresHebdoTotales >= 17.5) {
          resolve(remboursementMensuelTransportFamilleA = req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * req.body.repartitionFamille)
        }
        else {
          resolve(remboursementMensuelTransportFamilleA = (req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * req.body.repartitionFamille) * (req.body.heuresHebdoTotales / 17.5))
        }
      })
    )
  }

  const calculRemboursementMensuelTransportFamilleB = () => {
    return (
      new Promise(resolve => {
        if (req.body.heuresHebdoTotales >= 17.5) {
          resolve(remboursementMensuelTransportFamilleB = req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * (1 - req.body.repartitionFamille))
        }
        else {
          resolve(remboursementMensuelTransportFamilleB = (req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * (1 - req.body.repartitionFamille)) * (req.body.heuresHebdoTotales / 17.5))
        }
      })
    )
  }

  const calculNetMensuelAvantageFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          netMensuelAvantageFamilleA = Math.round((netMensuelFamilleA + primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 100) / 100
        )
      })
    )
  }

  const calculNetMensuelAvantageFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          netMensuelAvantageFamilleB = Math.round((netMensuelFamilleB + primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 100) / 100
        )
      })
    )
  }

  const calculCoutPatronalFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          coutPatronalFamilleA = Math.round((chargesPatronalesFamilleA + chargesSalarialesFamilleA + netMensuelAvantageFamilleA) * 100) / 100
        )
      })
    )
  }

  const calculCoutPatronalFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          coutPatronalFamilleB = Math.round((chargesPatronalesFamilleB + chargesSalarialesFamilleB + netMensuelAvantageFamilleB) * 100) / 100
        )
      })
    )
  }


  // __________________________________________ CALCULS DES AIDES _____________________________________

  const age = req.body.enfantPlusJeune
  const nbChild = req.body.nbEnfants
  const isIsole = req.body.parentIsole
  const money = req.body.ressourcesAnnuelles
  let cmgArray = []

  // ________________________________ AIDES CMG___________________________________

  const calculPalierCmg = () => {
    return new Promise(resolve => {
      if (isIsole) {
        switch (nbChild) {
          case 1:  // 1 enfant
            if (money > parentIsoleRevenusE && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier1)) // 230,56
            }
            else if (money > parentIsoleRevenusE && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier2)) // 115.28
            }
            else if (parentIsoleRevenusA <= money && money <= parentIsoleRevenusE && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier3)) // 384,31
            }
            else if (parentIsoleRevenusA <= money && money <= parentIsoleRevenusE && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier4)) // 192,18
            }
            else if (money < parentIsoleRevenusA && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 609,47
            }
            else if (money < parentIsoleRevenusA && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier6)) // 304,74
            }
            else {
              cmgArray.push(0)
            }
          case 2: // 2 enfants
            if (money > parentIsoleRevenusF && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier1)) // 230,56
            }
            else if (money > parentIsoleRevenusF && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier2)) // 115.28
            }
            else if (parentIsoleRevenusB <= money && money <= parentIsoleRevenusF && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier3)) // 384,31
            }
            else if (parentIsoleRevenusB <= money && money <= parentIsoleRevenusF && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier4)) // 192,18
            }
            else if (money < parentIsoleRevenusB && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 609,47
            }
            else if (money < parentIsoleRevenusB && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier6)) // 304,74
            }
            else {
              resolve(cmgArray.push(0))
            }
          case 3: // 3 enfants
            if (money > parentIsoleRevenusG && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier1)) // 230,56
            }
            else if (money > parentIsoleRevenusG && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier2)) // 115.28
            }
            else if (parentIsoleRevenusC <= money && money <= parentIsoleRevenusG && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier3)) // 384,31
            }
            else if (parentIsoleRevenusC <= money && money <= parentIsoleRevenusG && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier4)) // 192,18
            }
            else if (money < parentIsoleRevenusC && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 609,47
            }
            else if (money < parentIsoleRevenusC && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier6)) // 304,74
            }
            else {
              resolve(cmgArray.push(0))
            }
          case 4: // 4 enfants
            if (money > parentIsoleRevenusH && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier1)) // 230,56
            }
            else if (money > parentIsoleRevenusH && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier2)) // 115.28
            }
            else if (parentIsoleRevenusD <= money && money <= parentIsoleRevenusH && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier3)) // 384,31
            }
            else if (parentIsoleRevenusD <= money && money <= parentIsoleRevenusH && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier4)) // 192,18
            }
            else if (money < parentIsoleRevenusD && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 609,47
            }
            else if (money < parentIsoleRevenusD && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgParentIsolePalier6)) // 304,74
            }
            else {
              resolve(cmgArray.push(0))
            }
        }
      } else {
        switch (nbChild) {
          case 1: // 1 enfants
            if (money > coupleRevenusE && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier1)) // 177,36
            }
            else if (money > coupleRevenusE && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier2)) // 88,68
            }
            else if (coupleRevenusA <= money && money <= coupleRevenusE && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier3)) // 295,62
            }
            else if (coupleRevenusA <= money && money <= coupleRevenusE && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier4)) // 147,83
            }
            else if (money < coupleRevenusA && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 468.82
            }
            else if (money < coupleRevenusA && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier6)) // 234,41
            }
            else {
              resolve(cmgArray.push(0))
            }
          case 2: // 2 enfants
            if (money > coupleRevenusF && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier1)) // 177,36
            }
            else if (money > coupleRevenusF && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier2)) // 88,68
            }
            else if (coupleRevenusB <= money && money <= coupleRevenusF && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier3)) // 295,62
            }
            else if (coupleRevenusB <= money && money <= coupleRevenusF && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier4)) // 147,83
            }
            else if (money < coupleRevenusB && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 468.82
            }
            else if (money < coupleRevenusB && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier6)) // 234,41
            }
            else {
              resolve(cmgArray.push(0))
            }
          case 3: // 3 enfants de moins de 3 ans
            if (money > coupleRevenusG && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier1)) // 177,36
            }
            else if (money > coupleRevenusG && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier2)) // 88,68
            }
            else if (coupleRevenusC <= money && money <= coupleRevenusG && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier3)) // 295,62
            }
            else if (coupleRevenusC <= money && money <= coupleRevenusG && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier4)) // 147,83
            }
            else if (money < coupleRevenusC && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 468.82
            }
            else if (money < coupleRevenusC && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier6)) // 234,41
            }
            else {
              resolve(cmgArray.push(0))
            }
          case 4: // 4 enfants
            if (money > coupleRevenusH && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier1)) // 177,36
            }
            else if (money > coupleRevenusH && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier2)) // 88,68
            }
            else if (coupleRevenusD <= money && money <= coupleRevenusH && age < ageEnfant1) {
              resolve(cmgArray.push(cmgCouplePalier3)) // 295,62
            }
            else if (coupleRevenusD <= money && money <= coupleRevenusH && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier4)) // 147,83
            }
            else if (money < coupleRevenusD && age < ageEnfant1) {
              resolve(cmgArray.push(cmgParentIsolePalier5)) // 468.82
            }
            else if (money < coupleRevenusD && age > ageEnfant1 && age < ageEnfant2) {
              resolve(cmgArray.push(cmgCouplePalier6)) // 234,41
            }
            else {
              resolve(cmgArray.push(0))
            }
        }
      }
    })
  }

  const calculCmgFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          cmgFamilleA = Math.min(cmgArray[0], (netMensuelFamilleA * 0.85))
        )
      })
    )
  }

  const calculCmgFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          cmgFamilleB = Math.min(cmgArray[0], (netMensuelFamilleB * 0.85))
        )
      })
    )
  }


  // ________________________________________ AIDES CMG___________________________________________

  // ________________________________ AIDES PAJE___________________________________

  const enfantPlusJeune = req.body.enfantPlusJeune
  const calculAidesPaje = () => {
    return (
      new Promise(resolve => {
        if (enfantPlusJeune < 3) {
          resolve(
            aidesPajeFamilleA = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * tauxDeParticipationCotisationsSociales, plafondParticipationCotisation03),
            aidesPajeFamilleB = Math.min((chargesPatronalesFamilleB + chargesSalarialesFamilleB) * tauxDeParticipationCotisationsSociales, plafondParticipationCotisation03)
          )
        }
        else {
          resolve(
            aidesPajeFamilleA = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * tauxDeParticipationCotisationsSociales, plafondParticipationCotisation36),
            aidesPajeFamilleB = Math.min((chargesPatronalesFamilleB + chargesSalarialesFamilleB) * tauxDeParticipationCotisationsSociales, plafondParticipationCotisation36)
          )
        }
      })
    )
  }

  const calculDeductionForfaitaireChargesSocialesFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          deductionForfaitaireChargesSocialesFamilleA = Math.ceil(Math.min(((heuresMensuelles * 0.9 + heuresMensuellesMajorees) * req.body.repartitionFamille * abattementParHeure), chargesPatronalesSSFamilleA))
        )
      })
    )
  }

  const calculDeductionForfaitaireChargesSocialesFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          deductionForfaitaireChargesSocialesFamilleB = Math.ceil(Math.min(((heuresMensuelles * 0.9 + heuresMensuellesMajorees) * (1 - req.body.repartitionFamille) * abattementParHeure), chargesPatronalesSSFamilleB))
        )
      })
    )
  }

  const calculMontantAPayerFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          montantAPayerFamilleA = coutPatronalFamilleA - deductionForfaitaireChargesSocialesFamilleA - aidesPajeFamilleA - cmgFamilleA
        )
      })
    )
  }

  const calculMontantAPayerFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          montantAPayerFamilleB = coutPatronalFamilleB - deductionForfaitaireChargesSocialesFamilleB - aidesPajeFamilleB - cmgFamilleB
        )
      })
    )
  }

  const calculCreditImpotAnnuel = () => {
    return (
      new Promise(resolve => {
        if (req.body.premiereAnneeEmploiDomicile) {
          if (req.body.gardeAlternee) {
            resolve(
              creditImpotAnnuelFamilleA = Math.min(majorationPremiereAnneeEmploiADomicile + Math.min(plafondCreditImpot + majorationParEnfantACharges * 0.5, maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * tauxCreditImpot,
              creditImpotAnnuelFamilleB = Math.min(majorationPremiereAnneeEmploiADomicile + Math.min(plafondCreditImpot + majorationParEnfantACharges * 0.5, maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * tauxCreditImpot
            )
          } else {
            resolve(
              creditImpotAnnuelFamilleA = Math.min(majorationPremiereAnneeEmploiADomicile + Math.min(plafondCreditImpot + majorationParEnfantACharges, maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * tauxCreditImpot,
              creditImpotAnnuelFamilleB = Math.min(majorationPremiereAnneeEmploiADomicile + Math.min(plafondCreditImpot + majorationParEnfantACharges, maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * tauxCreditImpot
            )
          }
        } else {
          if (req.body.gardeAlternee) {
            resolve(
              creditImpotAnnuelFamilleA = Math.min(Math.min(plafondCreditImpot + majorationParEnfantACharges * 0.5, maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * tauxCreditImpot,
              creditImpotAnnuelFamilleB = Math.min(Math.min(plafondCreditImpot + majorationParEnfantACharges * 0.5, maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * tauxCreditImpot
            )
          } else {
            resolve(
              creditImpotAnnuelFamilleA = Math.min(Math.min(plafondCreditImpot + majorationParEnfantACharges, maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * tauxCreditImpot,
              creditImpotAnnuelFamilleB = Math.min(Math.min(plafondCreditImpot + majorationParEnfantACharges, maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * tauxCreditImpot
            )
          }
        }
      })
    )
  }

  const calculCreditImpotMensuelFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          creditImpotMensuelFamilleA = creditImpotAnnuelFamilleA / 12
        )
      })
    )
  }

  const calculCreditImpotMensuelFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          creditImpotMensuelFamilleB = creditImpotAnnuelFamilleB / 12
        )
      })
    )
  }

  const calculMontantAPayerPostCreditImpotFamilleA = () => {
    return (
      new Promise(resolve => {
        resolve(
          montantAPayerPostCreditImpotFamilleA = montantAPayerFamilleA - creditImpotMensuelFamilleA
        )
      })
    )
  }

  const calculMontantAPayerPostCreditImpotFamilleB = () => {
    return (
      new Promise(resolve => {
        resolve(
          montantAPayerPostCreditImpotFamilleB = montantAPayerFamilleB - creditImpotMensuelFamilleB
        )
      })
    )
  }
  const createResponse = () => {
    return (
      new Promise(resolve => {
        resolve(
          res.send({
            chargesPatronalesFamilleA,
            chargesPatronalesFamilleB,
            chargesSalarialesFamilleA,
            chargesSalarialesFamilleB,
            chargesPatronalesSSFamilleA,
            chargesPatronalesSSFamilleB,
            netMensuelFamilleA,
            netMensuelFamilleB,
            brutMensuelFamilleA,
            brutMensuelFamilleB,
            coutPatronalFamilleA,
            coutPatronalFamilleB,
            cmgFamilleA,
            cmgFamilleB,
            primePanierRepasFamilleA,
            primePanierRepasFamilleB,
            remboursementMensuelTransportFamilleA,
            remboursementMensuelTransportFamilleB,
            creditImpotAnnuelFamilleA,
            creditImpotAnnuelFamilleB,
            creditImpotMensuelFamilleA,
            creditImpotMensuelFamilleB,
            salaireBrutMensuel,
            netMensuelTotal,
            /* netHoraire, */
            brutAnnuelTotal,
            netAnnuelTotal,
            brutAnnuelFamilleA,
            brutAnnuelFamilleB,
            netMensuelAvantageFamilleA,
            netMensuelAvantageFamilleB,
            montantAPayerFamilleA,
            montantAPayerFamilleB,
            deductionForfaitaireChargesSocialesFamilleA,
            deductionForfaitaireChargesSocialesFamilleB,
            aidesPajeFamilleA,
            aidesPajeFamilleB,
            heuresRecuperation,
            montantAPayerPostCreditImpotFamilleA,
            montantAPayerPostCreditImpotFamilleB
          })
        )
      })
    )
  }

  async function allResults() {
    const result4 = [
      await getCmgValues(),
      await getEmployesValues(),
      await getEmployeursValues(),
      await getAidesValues(),
      await calculOfHeuresMensuelles(),
      await calculHeuresMensuellesMajorees(),
      await calculSalaireBrutMensuel(),
      await calculAssietteCsgRdsMensuel(),
      await calculAssietteCsgRdsHoraire(),
      await calculBrutMensuelFamilleA(),
      await calculBrutMensuelFamilleB(),
      await calculTrancheMensuelSS(),
      await calculTranchePMSS(),
      await calculBaseCommuneChargesSalariales(),
      await calculChargesSalarialesFamilleA(),
      await calculChargesSalarialesFamilleB(),
      await calculNetMensuelFamilleA(),
      await calculNetMensuelFamilleB(),
      await calculChargesTotal(),
      await calculNetMensuelTotal(),
      await calculBrutAnnuelTotal(),
      await calculNetAnnuelTotal(),
      await calculBrutAnnuelFamilleA(),
      await calculBrutAnnuelFamilleB(),
      await calculNetAnnuelTotalFamilleA(),
      await calculNetAnnuelTotalFamilleB(),
      await calculBaseCommuneChargesPatronales(),
      await calculChargesPatronalesFamilleA(),
      await calculChargesPatronalesFamilleB(),
      await calculChargesPatronalesSSFamilleA(),
      await calculChargesPatronalesSSFamilleB(),
      await calculPrimePanierRepasFamilleA(),
      await calculPrimePanierRepasFamilleB(),
      await calculRemboursementMensuelTransportFamilleA(),
      await calculRemboursementMensuelTransportFamilleB(),
      await calculNetMensuelAvantageFamilleA(),
      await calculNetMensuelAvantageFamilleB(),
      await calculCoutPatronalFamilleA(),
      await calculCoutPatronalFamilleB(),
      await calculPalierCmg(),
      await calculCmgFamilleA(),
      await calculCmgFamilleB(),
      await calculAidesPaje(),
      await calculDeductionForfaitaireChargesSocialesFamilleA(),
      await calculDeductionForfaitaireChargesSocialesFamilleB(),
      await calculMontantAPayerFamilleA(),
      await calculMontantAPayerFamilleB(),
      await calculCreditImpotAnnuel(),
      await calculCreditImpotMensuelFamilleA(),
      await calculCreditImpotMensuelFamilleB(),
      await calculMontantAPayerPostCreditImpotFamilleA(),
      await calculMontantAPayerPostCreditImpotFamilleB(),
      await createResponse()
    ]
    return result4
  }
  allResults()
},
)
// ________________________________ AIDES PAJE___________________________________

// ________________________________ TAUX REPARTITION ___________________________________


app.get('/api/calculsRepartition', function (req, res) {

    let enfants = req.body.items

    let hoursStart = '07:00'
    let hoursA =[]
    let hoursB =[]
    let hoursTot = []
    let MinutesTot = 0
    let commonMinutes = 0
    let heuresExcluA
    let heuresExcluB
    let commonArrayB
    let ponderateA = 0
    let ponderateFamilleA
    let ponderateFamilleB
    let ponderateB = 0
    let hourSupp25Commune
    let hourSupp25A
    let hourSupp25B
    let hourSupp50Commune
    let hourSupp50A
    let hourSupp50B
    let heuresExcluANormale
    let heuresExcluBNormale
    let heuresCommuneNormales
    let heuresExcluFamille
    let heuresRepartitionEgale
    let heuresCommune
    let NounouTotale

    const calculCommonMinutes = () => {
      return (
        new Promise (resolve => {
            enfants.map(hour => {
                switch (hour.famille) {
                  case 'A' : {
                    let testStart = hour.start.substr(0,hour.start.indexOf(' '))
                    let incrementTime = `${testStart} ${hoursStart}`
                    for (let i=0; i < 60; i++) {
                      incrementTime = moment(incrementTime, 'YYYY-MM-DD HH:mm').add(15, 'minutes').format('YYYY-MM-DD HH:mm')
                      if (((moment(incrementTime).isBetween(hour.start, hour.end)) || incrementTime === hour.start) && (hour.famille === 'A')) {
                        hoursA.push(hour.start)
                        hoursA.push(incrementTime)
                        hoursA.sort()
                      }
                    }
                  }
                  case 'B' : {
                    let testStart = hour.start.substr(0,hour.start.indexOf(' '))
                    let incrementTime = `${testStart} ${hoursStart}`
                    for (let i=0; i < 60; i++) {
                      incrementTime = moment(incrementTime, 'YYYY-MM-DD HH:mm').add(15, 'minutes').format('YYYY-MM-DD HH:mm')
                      if (((moment(incrementTime).isBetween(hour.start, hour.end)) || incrementTime === hour.start) && (hour.famille === 'B')) {
                        hoursB.push(hour.start)
                        hoursB.push(incrementTime)
                        hoursB.sort()
                      }
                    }
                  }
                }
            })
          enfants.map(hour => {
            let testStart = hour.start.substr(0,hour.start.indexOf(' '))
            let incrementTime = `${testStart} ${hoursStart}`
            for (let i=0; i < 60; i++) {
              incrementTime = moment(incrementTime, 'YYYY-MM-DD HH:mm').add(15, 'minutes').format('YYYY-MM-DD HH:mm')
              if ((moment(incrementTime).isBetween(hour.start, hour.end)) || incrementTime === hour.start) {
                hoursTot.push(hour.start)
                hoursTot.push(incrementTime)
                hoursTot.sort()
              }
            }
          })
          commonA = new Set(hoursA.filter(x => hoursB.includes(x)))
          commonArrayA = [...commonA]
          commonB = new Set(hoursB.filter(x => commonArrayA.includes(x)))
          commonArrayB = [...commonB]
          resolve(
            commonMinutes = commonMinutes + ((commonArrayB.length * 15)),
            MinutesTot = [...new Set(hoursTot)].length * 15
          )
        })
      )
    }

    const calculPonderationCommunes = () => {
      return (
        new Promise (resolve => {
          commonArrayB.map(val => {
            let nbEnfantA = 0 
            let nbEnfantB = 0
            enfants.map(hour => {
              if((moment(val).isBetween(hour.start, hour.end)) || val === hour.start || val === hour.end ){
                if(hour.famille === 'A'){
                  nbEnfantA = nbEnfantA + 1
                }
                else {
                  nbEnfantB = nbEnfantB + 1
                }
              }
            })
            if(nbEnfantB >= 1 && nbEnfantA >= 1){
                ponderateA = ponderateA + /* ((nbEnfantA / (nbEnfantA + nbEnfantB)) * */ nbEnfantA * 15
                ponderateB = ponderateB + /* ((nbEnfantB / (nbEnfantA + nbEnfantB)) * */ nbEnfantB * 15
            }
          })
          resolve (
            ponderateTotale = ponderateA + ponderateB,
            ponderateFamilleA = (ponderateA / ponderateTotale),
            ponderateFamilleB = (ponderateB / ponderateTotale),
          )
        })
      )
    }

    const calculHeuresExclusives = () => {
      return (
        new Promise (resolve => {
          resolve (
            heuresExcluA = [...new Set(hoursA)].length * 15 - commonMinutes,
            heuresExcluB = [...new Set(hoursB)].length * 15 - commonMinutes,
          )
        })
      )
    }

    const calculRepartitionExclu = () => {
      return (
        new Promise (resolve => {
          heuresCommune = commonMinutes
          heuresRepartitionEgale = (Math.min(heuresExcluA, heuresExcluB))
          if(heuresExcluB >= heuresExcluA) {
            if (heuresCommune <= 40*60) {
              resolve(
                heuresCommuneNormales = heuresCommune,
                hourSupp25Commune = 0,
                hourSupp50Commune = 0,
                heuresExcluANormale = Math.min(heuresRepartitionEgale, (40*60 - heuresCommuneNormales) / 2),
                heuresExcluBNormale = Math.min(heuresRepartitionEgale, (40*60 - heuresCommuneNormales) / 2) + Math.min(heuresExcluB, (40*60 - (heuresCommuneNormales + 2 * heuresExcluANormale))),
                heuresRepartitionEgale = heuresRepartitionEgale - (heuresExcluANormale),
                heuresExclu = heuresExcluB - (heuresExcluBNormale),
                hourSupp25A = Math.min(heuresRepartitionEgale, 4*60),
                hourSupp25B = Math.min(heuresRepartitionEgale, 4*60) + Math.min((heuresExclu - heuresRepartitionEgale), (8*60) - (2 * hourSupp25A)),
                heuresExclu2 = heuresExclu - hourSupp25B,
                heuresRepartitionEgale = heuresRepartitionEgale - hourSupp25A,
                hourSupp50A = Math.min(heuresRepartitionEgale, 1*60),
                hourSupp50B = Math.min(heuresRepartitionEgale, 1*60) + Math.min((heuresExclu2 - heuresRepartitionEgale), (2*60) - (2 * hourSupp50A))
              )
            }
            else if (heuresCommune <= 48*60 && heuresCommune > 40*60) {
              resolve(
                heuresCommuneNormales = 40*60,
                hourSupp25Commune = Math.min(heuresCommune - heuresCommuneNormales, 8*60),
                hourSupp50Commune =  0,
                heuresExcluANormale = 0,
                heuresExcluBNormale = 0,
                hourSupp25A = Math.min(heuresRepartitionEgale, (8*60 - hourSupp25Commune) / 2),
                hourSupp25B = Math.min(heuresRepartitionEgale, (8*60 - hourSupp25Commune) / 2) + Math.min(heuresExcluB, (8*60 - (hourSupp25Commune + 2 * hourSupp25A))),
                heuresExclu = heuresExcluB - hourSupp25B,
                heuresRepartitionEgale = heuresRepartitionEgale - (hourSupp25A),
                hourSupp50A = Math.min(heuresRepartitionEgale, 1*60),
                hourSupp50B = Math.min(heuresRepartitionEgale, 1*60) + Math.min((heuresExclu - heuresRepartitionEgale), (2*60) - (2 * hourSupp50A))
              )
            }
            else {
              resolve (
                heuresCommuneNormales = 40*60,
                hourSupp25Commune = 8*60,
                hourSupp50Commune =  Math.min(heuresCommune - heuresCommuneNormales - hourSupp25Commune, 2*60),
                heuresExcluANormale = 0,
                heuresExcluBNormale = 0,
                hourSupp25A = 0,
                hourSupp25B = 0,
                hourSupp50A = Math.min(heuresRepartitionEgale, (2*60 - hourSupp50Commune) / 2),
                hourSupp50B = Math.min(heuresRepartitionEgale, (2*60 - hourSupp50Commune) / 2) + Math.min(heuresExcluB  - heuresRepartitionEgale, (2*60 - (hourSupp50Commune + 2 * hourSupp50A)))
              )
            }
          }
          else {
            if (heuresCommune <= 40*60) {
              resolve(
                heuresCommuneNormales = heuresCommune,
                hourSupp25Commune = 0,
                hourSupp50Commune = 0,
                heuresExcluBNormale = Math.min(heuresRepartitionEgale, (40*60 - heuresCommuneNormales) / 2),
                heuresExcluANormale = Math.min(heuresRepartitionEgale, (40*60 - heuresCommuneNormales) / 2) + Math.min(heuresExcluA, (40*60 - (heuresCommuneNormales + 2 * heuresExcluBNormale))),
                heuresRepartitionEgale = heuresRepartitionEgale - (heuresExcluBNormale),
                heuresExclu = heuresExcluA - (heuresExcluANormale),
                hourSupp25B = Math.min(heuresRepartitionEgale, 4*60),
                hourSupp25A = Math.min(heuresRepartitionEgale, 4*60) + Math.min((heuresExclu - heuresRepartitionEgale), (8*60) - (2 * hourSupp25B)),
                heuresExclu2 = heuresExclu - hourSupp25A,
                heuresRepartitionEgale = heuresRepartitionEgale - hourSupp25B,
                hourSupp50B = Math.min(heuresRepartitionEgale, 1*60),
                hourSupp50A = Math.min(heuresRepartitionEgale, 1*60) + Math.min((heuresExclu2 - heuresRepartitionEgale), (2*60) - (2 * hourSupp50B))
              )
            }
            else if (heuresCommune <= 48*60 && heuresCommune > 40*60) {
              resolve(
                heuresCommuneNormales = 40*60,
                hourSupp25Commune = Math.min(heuresCommune - heuresCommuneNormales, 8*60),
                hourSupp50Commune =  0,
                heuresExcluANormale = 0,
                heuresExcluBNormale = 0,
                hourSupp25B = Math.min(heuresRepartitionEgale, (8*60 - hourSupp25Commune) / 2),
                hourSupp25A = Math.min(heuresRepartitionEgale, (8*60 - hourSupp25Commune) / 2) + Math.min(heuresExcluA, (8*60 - (hourSupp25Commune + 2 * hourSupp25B))),
                heuresExclu = heuresExcluA - hourSupp25A,
                heuresRepartitionEgale = heuresRepartitionEgale - (hourSupp25B),
                hourSupp50B = Math.min(heuresRepartitionEgale, 1*60),
                hourSupp50A = Math.min(heuresRepartitionEgale, 1*60) + Math.min((heuresExclu - heuresRepartitionEgale), (2*60) - (2 * hourSupp50B))
              )
            }
            else {
              resolve (
                heuresCommuneNormales = 40*60,
                hourSupp25Commune = 8*60,
                hourSupp50Commune =  Math.min(heuresCommune - heuresCommuneNormales - hourSupp25Commune, 2*60),
                heuresExcluANormale = 0,
                heuresExcluBNormale = 0,
                hourSupp25A = 0,
                hourSupp25B = 0,
                hourSupp50B = Math.min(heuresRepartitionEgale, (2*60 - hourSupp50Commune) / 2),
                hourSupp50A = Math.min(heuresRepartitionEgale, (2*60 - hourSupp50Commune) / 2) + Math.min(heuresExcluA  - heuresRepartitionEgale, (2*60 - (hourSupp50Commune + 2 * hourSupp50B)))
              )
            }
          }
        })
      )
    }

    const calculNounouTotale = () => {
      return (
        new Promise(resolve => {
          resolve(
            NounouTotale = Math.min(heuresCommuneNormales + heuresExcluANormale + heuresExcluBNormale + (hourSupp25Commune + hourSupp25A + hourSupp25B) * 1.25 + (hourSupp50Commune + hourSupp50A + hourSupp50B) * 1.50, 53*60),
          )  
        })
      )
    }

    const calculRepartitionTotale =() => { 
      return(
        new Promise (resolve => {
          resolve (
            RepartitionA = ((((heuresCommuneNormales +   (hourSupp25Commune * 1.25) +  (hourSupp50Commune * 1.50)) * ponderateFamilleA) + heuresExcluANormale + (hourSupp25A * 1.25) + (hourSupp50A * 1.50)) / NounouTotale),
            RepartitionB = ((((heuresCommuneNormales +   (hourSupp25Commune * 1.25) +  (hourSupp50Commune * 1.50)) * ponderateFamilleB) + heuresExcluBNormale + (hourSupp25B * 1.25) + (hourSupp50B * 1.50)) / NounouTotale),
            heuresCommuneNormales = heuresCommuneNormales / 60,
            hourSupp25Commune = hourSupp25Commune / 60,
            hourSupp50Commune = hourSupp50Commune / 60,
            heuresExcluANormale = heuresExcluANormale / 60,
            heuresExcluBNormale = heuresExcluBNormale / 60,
            hourSupp25A = hourSupp25A / 60,
            hourSupp25B = hourSupp25B / 60,
            hourSupp50B = hourSupp50B / 60,
            hourSupp50A = hourSupp50A / 60,
            tauxTot = (RepartitionA + RepartitionB) * 100,
            heuresExcluA = heuresExcluA / 60,
            heuresExcluB = heuresExcluB / 60,
          )
        })
      )
    }


    const sendResults = () => {
      return (
        new Promise(resolve => {
          resolve(
            res.send({heuresCommuneNormales, hourSupp25Commune, hourSupp50Commune, heuresExcluANormale, heuresExcluBNormale, hourSupp25A, hourSupp25B, hourSupp50B, hourSupp50A, RepartitionA, RepartitionB, tauxTot, heuresExcluA, heuresExcluB})
          )
        })
      )
    }

  async function calculRepartition() {
    const result4 = [
      await calculCommonMinutes(),
      await calculPonderationCommunes(),
      await calculHeuresExclusives(),
      await calculRepartitionExclu(),
      await calculNounouTotale(),
      await calculRepartitionTotale(),
      await sendResults()
    ]
    return result4
  }
  calculRepartition()
})

// _______________________________ APP LISTEN _______________________________________

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})


