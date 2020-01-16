const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

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

  /*--------------CALCUL SALAIRE BRUT-------------*/
  const tauxHeuresSupp = 1.25
  const heuresMensuelles = Math.ceil(
    req.body.heuresHebdo * (52 / 12),
  )
  const heuresMensuellesMajorees = Math.ceil(
    req.body.heuresSup * (52 / 12),
  )
  let salaireBrutMensuel =
    heuresMensuelles * req.body.tauxHoraire +
    heuresMensuellesMajorees *
    req.body.tauxHoraire *
    tauxHeuresSupp
  brutMensuelFamilleA = req.body.repartitionFamille * salaireBrutMensuel
  brutMensuelFamilleB = (1 - req.body.repartitionFamille) * salaireBrutMensuel

  /*--------------------------------------------------*/


  /*--------------CALCUL ASSIETTE CSG RDS-------------*/
  const PMSS = 3428
  let assietteCsgRdsMensuel =
    (98.25 * 0.01 * Math.min(4 * PMSS, salaireBrutMensuel) +
    Math.max(0, salaireBrutMensuel - 4 * PMSS)) * req.body.repartitionFamille

  let assietteCsgRdsHoraire = 98.25 * 0.01 * req.body.tauxHoraire

  /*---------------------- ROUTE CHARGES EMPLOYES ----------------------------*/

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
  let trancheA
  let trancheB
  let trancheC
  let trancheD

  tauxChargesEmployes.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      /*--------------CALCUL SALAIRE NET-------------*/

      const calculSalaireNet = () => {
        trancheAFamilleA = Math.min((salaireBrutMensuel * req.body.repartitionFamille - 0 * PMSS), (1 * PMSS - 0 * PMSS))
        trancheAFamilleB = Math.min((salaireBrutMensuel * (1 - req.body.repartitionFamille) - 0 * PMSS), (1 * PMSS - 0 * PMSS))
        trancheB = Math.max(Math.min((salaireBrutMensuel - 1 * PMSS), (4 * PMSS - 1 * PMSS)), 0)
        trancheC = Math.max(Math.min((salaireBrutMensuel - 4 * PMSS), (8 * PMSS - 4 * PMSS)), 0)
        trancheD = Math.max(Math.min((salaireBrutMensuel - 8 * PMSS), (8 * PMSS)), 0)
        if (salaireBrutMensuel <= PMSS) {
          trancheMensuelSS = "tranche A"
        }
        else if (1 * PMSS < salaireBrutMensuel && salaireBrutMensuel <= 4 * PMSS){
          trancheMensuelSS = "tranche B"
        }
        else if (4 * PMSS < salaireBrutMensuel && salaireBrutMensuel <= 8 * PMSS){
          trancheMensuelSS = "tranche C"
        }
        else {
          trancheMensuelSS = "tranche D"
        }
      }

      calculSalaireNet()

      const arrayTr = []
      taux.map(val => {
        let baseCommuneChargesSalariales = trancheB * 0.01 * (
          val.IrcemRetraiteComplementaireTrB +
          val.CegTrB +
          val.CetTrB
          )
        + assietteCsgRdsMensuel * 0.01 * (
          val.CsgDeductible +
          val.CsgNonDeductible +
          val.CrdsNonDeductible)
        + (heuresMensuellesMajorees * req.body.repartitionFamille * tauxHeuresSupp * req.body.tauxHoraire * (0.01 * val.exonerationDesCotisations))

        chargesSalarialesFamilleA = Math.round(((trancheAFamilleA * 0.01 * (
          val.maladieMaterniteInvaliditeDeces +
          val.assuranceVieillesseDeplafonnee +
          val.vieillessePlafonnee +
          val.IrcemRetraiteComplementaireTrA +
          val.CegTrA +
          val.cotisationSupplementaireAlsaceMoselle * req.body.alsaceMoselle +
          val.assuranceChomage +
          val.IrcemPrevoyance))
          + baseCommuneChargesSalariales) * 100) / 100
        
        chargesSalarialesFamilleB = Math.round(((trancheAFamilleB * 0.01 * (
          val.maladieMaterniteInvaliditeDeces +
          val.assuranceVieillesseDeplafonnee +
          val.vieillessePlafonnee +
          val.IrcemRetraiteComplementaireTrA +
          val.CegTrA +
          val.cotisationSupplementaireAlsaceMoselle * req.body.alsaceMoselle +
          val.assuranceChomage +
          val.IrcemPrevoyance))
          + baseCommuneChargesSalariales) * 100) / 100

          netMensuelFamilleA = brutMensuelFamilleA - chargesSalarialesFamilleA
          netMensuelFamilleB = brutMensuelFamilleB - chargesSalarialesFamilleB
          chargesTotal = chargesSalarialesFamilleA + chargesSalarialesFamilleB
          netMensuelTotal = salaireBrutMensuel - chargesTotal
          brutAnnuelTotal = Math.round((salaireBrutMensuel * 12) * 100) / 100
          netAnnuelTotal = Math.round((netMensuelTotal * 12) * 100) / 100
          brutAnnuelFamilleA = brutAnnuelTotal * req.body.repartitionFamille
          brutAnnuelFamilleB = brutAnnuelTotal * (1 - req.body.repartitionFamille)
          netAnnuelTotalFamilleA = netAnnuelTotal * req.body.repartitionFamille
          netAnnuelTotalFamilleB = netAnnuelTotal * (1 - req.body.repartitionFamille)
          

        /* netHoraire = Math.round((req.body.tauxHoraire -
          ((req.body.tauxHoraire * 0.01 * (
            val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            arrayTr[3] +
            arrayTr[0] +
            arrayTr[1] +
            arrayTr[2] +
            val.assuranceChomage +
            val.IrcemPrevoyance))
            + (assietteCsgRdsHoraire * 0.01 * (
              val.CsgDeductible +
              val.CsgNonDeductible +
              val.CrdsNonDeductible)))) * 100) / 100
*/
      })
    },
  ) 

  /*--------------------------CALCUL SALAIRE NET---------------------*/


  /*---------------------- ROUTE CHARGES EMPLOYEURS ----------------------------*/

  tauxChargesEmployeurs.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      taux.map(val => {

        baseCommuneChargesPatronales = trancheB * 0.01 * (
          val.IrcemRetraiteComplementaireTrB +
          val.CegTrB +
          val.CetTrB
          )

        chargesPatronalesFamilleA =
          Math.round((trancheAFamilleA * 0.01 *(
            val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            val.accidentDuTravail +
            val.allocationsFamiliales +
            val.IrcemRetraiteComplementaireTrA +
            val.CegTrA +
            val.assuranceChomage +
            val.IrcemPrevoyance +
            val.contributionSolidariteAutonomie +
            val.formationProfessionnelle +
            val.fondsNationalAideAuLogement +
            val.contributionAuFinancementDesOrganisationsSyndicales
          ) +
          baseCommuneChargesPatronales)* 100) / 100


          chargesPatronalesFamilleB =
          Math.round((trancheAFamilleB * 0.01 *(
            val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            val.accidentDuTravail +
            val.allocationsFamiliales +
            val.IrcemRetraiteComplementaireTrA +
            val.CegTrA +
            val.assuranceChomage +
            val.IrcemPrevoyance +
            val.contributionSolidariteAutonomie +
            val.formationProfessionnelle +
            val.fondsNationalAideAuLogement +
            val.contributionAuFinancementDesOrganisationsSyndicales
          ) +
          baseCommuneChargesPatronales)* 100) / 100


        chargesPatronalesSSFamilleA = Math.round(((val.maladieMaterniteInvaliditeDeces +
          val.assuranceVieillesseDeplafonnee +
          val.vieillessePlafonnee +
          val.accidentDuTravail +
          val.allocationsFamiliales) * salaireBrutMensuel * req.body.repartitionFamille * 0.01) * 100) / 100
        
        chargesPatronalesSSFamilleB = Math.round(((val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            val.accidentDuTravail +
            val.allocationsFamiliales) * salaireBrutMensuel * (1- req.body.repartitionFamille) * 0.01) * 100) / 100

        primePanierRepasFamilleA = (val.joursOuvres - req.body.joursCP - req.body.joursRecup) * (req.body.joursTravaillesSemaines / 5) / 12 * req.body.montantRepas * req.body.repartitionFamille * 100 / 100

        primePanierRepasFamilleB = (val.joursOuvres - req.body.joursCP - req.body.joursRecup) * (req.body.joursTravaillesSemaines / 5) / 12 * req.body.montantRepas * (1 - req.body.repartitionFamille) * 100 / 100

        remboursementMensuelTransportFamilleA = req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * req.body.repartitionFamille

        remboursementMensuelTransportFamilleB = req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * (1 - req.body.repartitionFamille)

        setInterval(() => {
          netMensuelAvantageFamilleA = Math.round((netMensuelFamilleA + primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 100) / 100

          netMensuelAvantageFamilleB = Math.round((netMensuelFamilleB + primePanierRepasFamilleB+ remboursementMensuelTransportFamilleB) * 100) / 100

          coutPatronalFamilleA = Math.round((chargesPatronalesFamilleA + chargesSalarialesFamilleA + netMensuelAvantageFamilleA) * 100) / 100

          coutPatronalFamilleB = Math.round((chargesPatronalesFamilleB + chargesSalarialesFamilleB + netMensuelAvantageFamilleB) * 100) / 100
        }, 10);


      }
      )
    }
  )

  // __________________________________________ CALCULS DES AIDES _____________________________________

  cmgs.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      const age = req.body.enfantPlusJeune
      const nbChild = req.body.nbEnfants
      const isIsole = req.body.parentIsole
      const money = req.body.ressourcesAnnuelles
      let cmgArray = []

      taux.map(val => {

        // ________________________________ AIDES CMG___________________________________

        if (isIsole) {
          switch (nbChild) {
            case 1:  // 1 enfant
              if (money > val.parentIsoleRevenusE && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (money > val.parentIsoleRevenusE && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier2) // 115.28
              }
              else if (val.parentIsoleRevenusA <= money && money <= val.parentIsoleRevenusE && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier3) // 384,31
              }
              else if (val.parentIsoleRevenusA <= money && money <= val.parentIsoleRevenusE && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier4) // 192,18
              }
              else if (money < val.parentIsoleRevenusA && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 609,47
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier6) // 304,74
              }
            case 2: // 2 enfants
              if (money > val.parentIsoleRevenusF && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (money > val.parentIsoleRevenusF && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier2) // 115.28
              }
              else if (val.parentIsoleRevenusB <= money && money <= val.parentIsoleRevenusF && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier3) // 384,31
              }
              else if (val.parentIsoleRevenusB <= money && money <= val.parentIsoleRevenusF && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier4) // 192,18
              }
              else if (money < val.parentIsoleRevenusB && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 609,47
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier6) // 304,74
              }
            case 3: // 3 enfants
              if (money > val.parentIsoleRevenusG && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (money > val.parentIsoleRevenusG && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier2) // 115.28
              }
              else if (val.parentIsoleRevenusC <= money && money <= val.parentIsoleRevenusG && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier3) // 384,31
              }
              else if (val.parentIsoleRevenusC <= money && money <= val.parentIsoleRevenusG && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier4) // 192,18
              }
              else if (money < val.parentIsoleRevenusC && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 609,47
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier6) // 304,74
              }
            case 4: // 4 enfants
              if (money > val.parentIsoleRevenusH && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (money > val.parentIsoleRevenusH && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier2) // 115.28
              }
              else if (val.parentIsoleRevenusD <= money && money <= val.parentIsoleRevenusH && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier3) // 384,31
              }
              else if (val.parentIsoleRevenusD <= money && money <= val.parentIsoleRevenusH && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgParentIsolePalier4) // 192,18
              }
              else if (money < val.parentIsoleRevenusD && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 609,47
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier6) // 304,74
              }
          }
        } else {
          switch (nbChild) {
            case 1: // 1 enfants
              if (money > val.coupleRevenusE && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier1) // 177,36
              }
              else if (money > val.coupleRevenusE && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier2) // 88,68
              }
              else if (val.coupleRevenusA <= money && money <= val.coupleRevenusE && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier3) // 295,62
              }
              else if (val.coupleRevenusA <= money && money <= val.coupleRevenusE && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier4) // 147,83
              }
              else if (money < val.coupleRevenusA && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 468.82
              }
              else {
                cmgArray.push(val.cmgCouplePalier6) // 234,41
              }
            case 2: // 2 enfants
              if (money > val.coupleRevenusF && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier1) // 177,36
              }
              else if (money > val.coupleRevenusF && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier2) // 88,68
              }
              else if (val.coupleRevenusB <= money && money <= val.coupleRevenusF && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier3) // 295,62
              }
              else if (val.coupleRevenusB <= money && money <= val.coupleRevenusF && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier4) // 147,83
              }
              else if (money < val.coupleRevenusB && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 468.82
              }
              else {
                cmgArray.push(val.cmgCouplePalier6) // 234,41
              }
            case 3: // 3 enfants de moins de 3 ans
              if (money > val.coupleRevenusG && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier1) // 177,36
              }
              else if (money > val.coupleRevenusG && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier2) // 88,68
              }
              else if (val.coupleRevenusC <= money && money <= val.coupleRevenusG && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier3) // 295,62
              }
              else if (val.coupleRevenusC <= money && money <= val.coupleRevenusG && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier4) // 147,83
              }
              else if (money < val.coupleRevenusC && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 468.82
              }
              else {
                cmgArray.push(val.cmgCouplePalier6) // 234,41
              }
            case 4: // 4 enfants
              if (money > val.coupleRevenusH && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier1) // 177,36
              }
              else if (money > val.coupleRevenusH && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier2) // 88,68
              }
              else if (val.coupleRevenusD <= money && money <= val.coupleRevenusH && age < val.ageEnfant1) {
                cmgArray.push(val.cmgCouplePalier3) // 295,62
              }
              else if (val.coupleRevenusD <= money && money <= val.coupleRevenusH && age > val.ageEnfant1 && age < val.ageEnfant2) {
                cmgArray.push(val.cmgCouplePalier4) // 147,83
              }
              else if (money < val.coupleRevenusD && age < val.ageEnfant1) {
                cmgArray.push(val.cmgParentIsolePalier5) // 468.82
              }
              else {
                cmgArray.push(val.cmgCouplePalier6) // 234,41
              }
          }
        }
          cmgFamilleA = Math.min(cmgArray[0] , (netMensuelFamilleA * 0.85))
          cmgFamilleB = Math.min(cmgArray[0] , (netMensuelFamilleB * 0.85))

       
      })


      // ________________________________________ AIDES CMG___________________________________________

      // ________________________________ AIDES PAJE___________________________________

      aides.find(
        { dateDebutAnnee: req.body.dateDebutAnnee },
        function (err, taux) {
          const enfantPlusJeune = req.body.enfantPlusJeune

          taux.map(val => {

            if (enfantPlusJeune < 3) {
              aidesPajeFamilleA = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation03)
              aidesPajeFamilleB = Math.min((chargesPatronalesFamilleB + chargesSalarialesFamilleB) * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation03)
            }
            else {
              aidesPajeFamilleA = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation36)
              aidesPajeFamilleB = Math.min((chargesPatronalesFamilleB + chargesSalarialesFamilleB) * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation36)
            }

            deductionForfaitaireChargesSocialesFamilleA = Math.ceil(Math.min(((heuresMensuelles  * 0.9 + heuresMensuellesMajorees) * req.body.repartitionFamille * val.abattementParHeure), chargesPatronalesSSFamilleA))

            deductionForfaitaireChargesSocialesFamilleB = Math.ceil(Math.min(((heuresMensuelles  * 0.9 + heuresMensuellesMajorees) * (1 - req.body.repartitionFamille) * val.abattementParHeure), chargesPatronalesSSFamilleB))

            montantAPayerFamilleA = coutPatronalFamilleA - deductionForfaitaireChargesSocialesFamilleA - aidesPajeFamilleA - cmgFamilleA

            montantAPayerFamilleB = coutPatronalFamilleB - deductionForfaitaireChargesSocialesFamilleB - aidesPajeFamilleB - cmgFamilleB




            if (req.body.premiereAnneeEmploiDomicile) {
              if (req.body.gardeAlternee) {
                creditImpotAnnuelFamilleA = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges * 0.5, val.maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * val.tauxCreditImpot
                

                creditImpotAnnuelFamilleB = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges * 0.5, val.maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * val.tauxCreditImpot
                

              } else {
                creditImpotAnnuelFamilleA = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges, val.maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * val.tauxCreditImpot
                

                console.log(val.majorationPremiereAnneeEmploiADomicile, val.plafondCreditImpot, val.majorationParEnfantACharges, val.maxCreditImpot, montantAPayerFamilleA, primePanierRepasFamilleA, remboursementMensuelTransportFamilleA, val.tauxCreditImpot)

                creditImpotAnnuelFamilleB = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges, val.maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * val.tauxCreditImpot
                
              }
            } else {
              if (req.body.gardeAlternee) {
                creditImpotAnnuelFamilleA = Math.min(Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges * 0.5, val.maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * val.tauxCreditImpot
                

                creditImpotAnnuelFamilleB = Math.min(Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges * 0.5, val.maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * val.tauxCreditImpot
                
              } else {
                creditImpotAnnuelFamilleA = Math.min(Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges, val.maxCreditImpot), (montantAPayerFamilleA - primePanierRepasFamilleA + remboursementMensuelTransportFamilleA) * 12) * val.tauxCreditImpot
                

                creditImpotAnnuelFamilleB = Math.min(Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges, val.maxCreditImpot), (montantAPayerFamilleB - primePanierRepasFamilleB + remboursementMensuelTransportFamilleB) * 12) * val.tauxCreditImpot
                
              }
            }

            creditImpotMensuelFamilleA = creditImpotAnnuelFamilleA / 12

            creditImpotMensuelFamilleB = creditImpotAnnuelFamilleB / 12
          })


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
            aidesPajeFamilleB
          })
        })

      // ________________________________ AIDES PAJE___________________________________

    })

})
// _______________________________ APP LISTEN _______________________________________

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})


