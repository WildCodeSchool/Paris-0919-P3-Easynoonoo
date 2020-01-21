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
                joursOuvres = val.dateDebutAnneeEmployeurs
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
            heuresRecuperation = req.body.heuresSup - 8
          )
        }
        else {
          resolve(
            heuresMensuellesMajorees = Math.ceil(8 * (52 / 12))
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
            IrcemPrevoyance))
            + baseCommuneChargesSalariales) * 100) / 100
        )
      ))
    )
  }

  const calculChargesSalarialesFamilleB = () => {
    return (
      new Promise(resolve => {
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
            + baseCommuneChargesSalariales) * 100) / 100
        )
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
          primePanierRepasFamilleA = (joursOuvres - req.body.joursCP - req.body.joursRecup) * (req.body.joursTravaillesSemaines / 5) / 12 * req.body.montantRepas * req.body.repartitionFamille * 100 / 100
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
              resolev(cmgArray.push(cmgCouplePalier3)) // 295,62
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
  calculRepartition = () => {

    let enfants = [
      {
        start :"2019-12-11 10:30",
        end :"2019-12-11 13:45",
        famille : 'A',
        enfant : 1,
        jour : 1
      },
      {
        start :"2019-12-11 16:30",
        end :"2019-12-11 18:45",
        famille : 'A',
        enfant : 1,
        jour : 1
      },
      {
        start :"2019-12-11 07:30",
        end :"2019-12-11 13:00",
        famille : 'A',
        enfant : 2,
        jour : 1
      },
      {
        start :"2019-12-11 17:00",
        end :"2019-12-11 18:45",
        famille : 'A',
        enfant : 2
      },
      {
        start :"2019-12-11 10:00",
        end :"2019-12-11 12:00",
        famille : 'B',
        enfant : 1,
        jour : 1
      },
      {
        start :"2019-12-11 15:00",
        end :"2019-12-11 16:45",
        famille : 'B',
        enfant : 1,
        jour : 1
      },
      {
        start :"2019-12-11 08:00",
        end :"2019-12-11 16:45",
        famille : 'B',
        enfant : 2,
        jour : 1
      },
    ]
    let jour1
    let hour
    let end
    let enfant
    let jour

/*     if (moment(enfants[1].start).isBetween(enfants[0].start, enfants[0].end)) {
      hour1 = 'ok'
    }
    else {
      hour1 = 'none'
    } */

    /* resolve (
      hour = moment().diff(hours.start, "hours")
    ) */

    const calculFirstHour = () => {
      new Promise (resolve => {
        for(let i=0; i<enfants.length; i++){
          switch (enfants[i].jour) {
            case 1 : {
              if (moment(hour).diff(enfants[i].start, 'hours') > 0) {
                hour = enfants[i].start
                end = enfants[i].end
                famille = enfants[i].famille
                enfant = enfants[i].enfant
                jour = enfants[i].jour
              }
            }
          }
          console.log(hour)
        }
        enfants.map(hours => {
          if (moment(hours.start).isBetween(hour, end)) {
            console.log('ok')
          }
        })
      })
    }
    
    calculFirstHour()
    res.send({hour})

    

/*     let date1 = moment(this.state.items[0]);

			let minutes = this.state.minutes
			let date2 = moment(this.state.items[1]);
			let difference = date2.diff(date1, 'minutes');
			minutes.push(difference)
			
			this.setState({ minutes: difference })
			this.setState({ minutes: minutes })

			let total = minutes.reduce((a, b) => a + b, 0)

			// _____ CALCULS MINUTES EN HEURES
			
			let time = total / 60
			let min = (time % 1) * 60
			let hours = Math.trunc(total / 60)

			let realTime = hours + ' heures et ' + min + ' min'
			this.setState({ time: realTime, setTime: true })
			console.log('TIME', realTime); */
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


