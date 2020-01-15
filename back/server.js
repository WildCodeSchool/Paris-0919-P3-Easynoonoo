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

  const heuresMensuelles = Math.ceil(
    req.body.heuresHebdo * (52 / 12),
  )
  const heuresMensuellesMajorees = Math.ceil(
    req.body.heuresSup * (52 / 12),
  )

  // const tauxHeuresSupp = 1.25 // val.tauxHeuresSupp
  // salaireBrutMensuel = heuresMensuelles * req.body.tauxHoraire + heuresMensuellesMajorees * req.body.tauxHoraire * tauxHeuresSupp

  // brutMensuelFamilleA = req.body.repartitionFamille * salaireBrutMensuel
  // brutMensuelFamilleB = (1 - req.body.repartitionFamille) * salaireBrutMensuel


  /*--------------------------------------------------*/


  // /*--------------CALCUL ASSIETTE CSG RDS-------------*/
  // const PMSS = 3377
  // let assietteCsgRdsMensuel =
  //   98.25 * 0.01 * Math.min(4 * PMSS, salaireBrutMensuel) +
  //   Math.max(0, salaireBrutMensuel - 4 * PMSS)

  // let assietteCsgRdsHoraire = 98.25 * 0.01 * req.body.tauxHoraire

  /*---------------------- ROUTE CHARGES EMPLOYES ----------------------------*/

  let chargesPatronalesFamilleA
  let chargesSalarialesFamilleA
  let chargesPatronalesSS
  let netMensuelFamilleA
  let coutPatronalFamilleA
  let cmg
  let primePanierRepas
  let remboursementMensuelTransport
  let creditImpotAnnuelFamilleA
  let creditImpotMensuelFamilleA
  let netMensuelTotal
  let netHoraire
  let brutAnnuelTotalFamille
  let netAnnuelFamille
  let chargesTotal
  let netMensuelAvantageFamilleA
  let montantAPayer
  let deductionForfaitaireChargesSociales
  let aidesPaje

  //________________________________

  let brutMensuelFamilleA
  let brutMensuelFamilleB
  let salaireBrutMensuel

  tauxChargesEmployes.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      /*--------------CALCUL SALAIRE NET-------------*/

      const arrayTr = []
      taux.map(val => {

        async function functionSalaireBrutMensuel() {
          return salaireBrutMensuel = heuresMensuelles * req.body.tauxHoraire + heuresMensuellesMajorees * req.body.tauxHoraire * val.tauxHeuresSupp;
        }
        functionSalaireBrutMensuel().then(console.log)

        async function funcBrutMensuelFamilleA() {
          return salaireBrutMensuel = heuresMensuelles * req.body.tauxHoraire + heuresMensuellesMajorees * req.body.tauxHoraire * val.tauxHeuresSupp
        }
        funcBrutMensuelFamilleA().then(console.log)

        async function funcBrutMensuelFamilleB() {
          return brutMensuelFamilleB = (1 - req.body.repartitionFamille) * salaireBrutMensuel
        }
        funcBrutMensuelFamilleB().then(console.log)


        /*--------------CALCUL ASSIETTE CSG RDS-------------*/

        // let assietteCsgRdsMensuel =
        //   val.tauxAssietteCSG_RDS * 0.01 * Math.min(4 * val.PMSS, salaireBrutMensuel) +
        //   Math.max(0, salaireBrutMensuel - 4 * val.PMSS)

        async function funcAssietteCsgRdsMensuel() {
          return assietteCsgRdsMensuel = val.tauxAssietteCSG_RDS * 0.01 * Math.min(4 * val.PMSS, salaireBrutMensuel) +
            Math.max(0, salaireBrutMensuel - 4 * val.PMSS)
        }
        funcAssietteCsgRdsMensuel().then(console.log)

        // let assietteCsgRdsHoraire = val.tauxAssietteCSG_RDS * 0.01 * req.body.tauxHoraire;

        async function funcAssietteCsgRdsHoraire() {
          return assietteCsgRdsHoraire = val.tauxAssietteCSG_RDS * 0.01 * req.body.tauxHoraire;
        }
        funcAssietteCsgRdsHoraire().then(console.log);

        if (req.body.trancheA && req.body.alsaceMoselle) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
            val.cotisationSupplementaireAlsaceMoselle
          )
        } else if (req.body.trancheA && req.body.alsaceMoselle == false) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
            0
          )
        }
        else if (req.body.trancheB && req.body.alsaceMoselle) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
            val.cotisationSupplementaireAlsaceMoselle
          )
        }
        else {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrB,
            val.CegTrB,
            val.CetTrB,
            0
          )
        }
        async function funcNetHoraire() {
          return netHoraire = Math.round((req.body.tauxHoraire -
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
        }
        funcNetHoraire().then(console.log)

        async function funcChargesTotal() {
          return chargesTotal =
            (salaireBrutMensuel * 0.01 * (
              val.maladieMaterniteInvaliditeDeces +
              val.assuranceVieillesseDeplafonnee +
              val.vieillessePlafonnee +
              arrayTr[3] +
              arrayTr[0] +
              arrayTr[1] +
              arrayTr[2] +
              val.assuranceChomage +
              val.IrcemPrevoyance))
            + (assietteCsgRdsMensuel * 0.01 * (
              val.CsgDeductible +
              val.CsgNonDeductible +
              val.CrdsNonDeductible))
            + (heuresMensuellesMajorees * val.tauxHeuresSupp * req.body.tauxHoraire * (0.01 * val.exonerationDesCotisations))
        }
        funcChargesTotal().then(console.log)

        async function funcNetMensuelTotal() {
          return netMensuelTotal = Math.round((salaireBrutMensuel - chargesTotal) * 100) / 100
        }
        funcNetMensuelTotal().then(console.log)

        async function funcNetMensuelFamilleA() {
          return netMensuelFamilleA = Math.round((netMensuelTotal * req.body.repartitionFamille) * 100) / 100
        }
        funcNetMensuelFamilleA().then(console.log)

        async function funcNetMensuelFamilleB() {
          return netMensuelFamilleB = (netMensuelTotal * (1 - req.body.repartitionFamille))
        }
        funcNetMensuelFamilleB().then(console.log)

        async function funcBrutAnnuelTotal() {
          return brutAnnuelTotal = Math.round((salaireBrutMensuel * 12) * 100) / 100
        }
        funcBrutAnnuelTotal().then(console.log)

        async function funcNetAnnuelTotal() {
          return netAnnuelTotal = Math.round((netMensuelTotal * 12) * 100) / 100
        }
        funcNetAnnuelTotal().then(console.log)

        async function funcNetAnnuelTotalFamille() {
          return netAnnuelTotalFamille = netAnnuelTotal * req.body.repartitionFamille
        }
        funcNetAnnuelTotalFamille().then(console.log)

        async function funcChargesSalarialesFamilleA() {
          return chargesSalarialesFamilleA = Math.round((brutMensuelFamilleA - netMensuelFamilleA) * 100) / 100
        }
        funcChargesSalarialesFamilleA()

        async function funcBrutAnnuelTotalFamille() {
          return brutAnnuelTotalFamille = brutAnnuelTotal * req.body.repartitionFamille
        }
        funcBrutAnnuelTotalFamille().then(console.log)
      })
    },
  )


  /*---------------------- ROUTE CHARGES EMPLOYEURS ----------------------------*/

  tauxChargesEmployeurs.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      /*--------------------------CALCUL SALAIRE NET---------------------*/

      const arrayTr = []
      taux.map(val => {
        if (req.body.trancheA) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
          )
        }
        else {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrB,
            val.CegTrB,
            val.CetTrB,
          )
        }

        async function funcChargesPatronalesFamilleA() {
          return chargesPatronalesFamilleA =
            Math.round(salaireBrutMensuel * req.body.repartitionFamille * 0.01 * (
              val.maladieMaterniteInvaliditeDeces +
              val.assuranceVieillesseDeplafonnee +
              val.vieillessePlafonnee +
              val.accidentDuTravail +
              val.allocationsFamiliales +
              arrayTr[0] +
              arrayTr[1] +
              arrayTr[2] +
              val.assuranceChomage +
              val.IrcemPrevoyance +
              val.contributionSolidariteAutonomie +
              val.formationProfessionnelle +
              val.fondsNationalAideAuLogement +
              val.contributionAuFinancementDesOrganisationsSyndicales
            ) * 100) / 100
        }
        funcChargesPatronalesFamilleA().then(console.log)

        async function funcChargesPatronalesSS() {
          return chargesPatronalesSS = Math.round(((val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            val.accidentDuTravail +
            val.allocationsFamiliales) * salaireBrutMensuel * req.body.repartitionFamille * 0.01) * 100) / 100
        }
        funcChargesPatronalesSS().then(console.log)

        async function funcPrimePanierRepas() {
          return primePanierRepas = Math.round((val.joursOuvres
            - req.body.joursCP - req.body.joursRecup) * (req.body.joursTravaillesSemaines / 5) / 12 * req.body.montantRepas * req.body.repartitionFamille) * 100 / 100
        }
        funcPrimePanierRepas().then(console.log)

        async function funcRemboursementMensuelTransport() {
          return remboursementMensuelTransport = req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * req.body.repartitionFamille
        }
        funcRemboursementMensuelTransport().then(console.log)

        async function funcNetMensuelAvantageFamilleA() {
          return netMensuelAvantageFamilleA = Math.round((netMensuelFamilleA + primePanierRepas + remboursementMensuelTransport) * 100) / 100
        }
        funcNetMensuelAvantageFamilleA().then(console.log)

        async function funcCoutPatronalFamilleA() {
          return coutPatronalFamilleA = Math.round((chargesPatronalesFamilleA + chargesSalarialesFamilleA + netMensuelAvantageFamilleA) * 100) / 100
        }
        funcCoutPatronalFamilleA().then(console.log)
      })
    })

  // __________________________________________ CALCULS DES AIDES _____________________________________

  cmgs.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      const age = req.body.enfantPlusJeune
      const nbChild = req.body.nbEnfants
      const isIsole = req.body.parentIsole
      const money = req.body.ressourcesAnnuelles
      cmgArray = []

      taux.map(val => {

        // ________________________________ AIDES CMG___________________________________

        if (isIsole) {
          switch (nbChild) {
            case 1:  // 1 enfant moins de 3 ans
              if (money > val.parentIsoleRevenusE) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (val.parentIsoleRevenusA <= money && money <= val.parentIsoleRevenusE) {
                cmgArray.push(val.cmgParentIsolePalier2) // 384,31
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier3) // 609,47
              }
            case 2: // 2 enfants moins de 3 ans
              if (money > val.parentIsoleRevenusF) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (val.parentIsoleRevenusB <= money && money <= val.parentIsoleRevenusF) {
                cmgArray.push(val.cmgParentIsolePalier2) // 384,31
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier3) // 609,47
              }
            case 3: // 3 enfants moins de 3 ans
              if (money > val.parentIsoleRevenusG) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (val.parentIsoleRevenusC <= money && money <= val.parentIsoleRevenusG) {
                cmgArray.push(val.cmgParentIsolePalier2) // 384,31
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier3) // 609,47
              }
            case 4: // 4 enfants moins de 3 ans
              if (money > val.parentIsoleRevenusH) {
                cmgArray.push(val.cmgParentIsolePalier1) // 230,56
              }
              else if (val.parentIsoleRevenusD <= money && money <= val.parentIsoleRevenusH) {
                cmgArray.push(val.cmgParentIsolePalier2) // 384,31
              }
              else {
                cmgArray.push(val.cmgParentIsolePalier3) // 609,47
              }
          }
        } else {
          switch (nbChild) {
            case 1: // 1 enfants de moins de 3 ans
              if (money > val.coupleRevenusE) {
                cmgArray.push(val.cmgCouplePalier1) // 177,36
              }
              else if (val.coupleRevenusA <= money && money <= val.coupleRevenusE) {
                cmgArray.push(val.cmgCouplePalier2) // 295,62
              }
              else {
                cmgArray.push(val.cmgCouplePalier3) // 468.82
              }
            case 2: // 2 enfants de moins de 3 ans
              if (money > val.coupleRevenusF) {
                cmgArray.push(val.cmgCouplePalier1) // 177.36
              }
              else if (val.coupleRevenusB <= money && money <= val.coupleRevenusF) {
                cmgArray.push(val.cmgCouplePalier2) // 295.62
              }
              else {
                cmgArray.push(val.cmgCouplePalier3) // 468.82
              }
            case 3: // 3 enfants de moins de 3 ans
              if (money > val.coupleRevenusG) {
                cmgArray.push(val.cmgCouplePalier1) // 177.36
              }
              else if (val.coupleRevenusC <= money && money <= val.coupleRevenusG) {
                cmgArray.push(val.cmgCouplePalier2) // 295.62
              }
              else {
                cmgArray.push(val.cmgCouplePalier3) // 468.82
              }
            case 4: // 4 enfants de moins de 3 ans
              if (money > val.coupleRevenusH) {
                cmgArray.push(val.cmgCouplePalier1) // 177.36
              }
              else if (val.coupleRevenusD <= money && money <= val.coupleRevenusH) {
                cmgArray.push(val.cmgCouplePalier2) // 295.62
              }
              else {
                cmgArray.push(val.cmgCouplePalier3) // 468.82
              }
          }
        }
        if (req.body.enfantPlusJeune < 3) {
          cmg = Math.min(cmgArray[0], (netMensuelFamilleA * 0.85))

        } else {
          cmg = Math.min(cmgArray[0] / 2, (netMensuelFamilleA * 0.85))
        }
      })
      // ________________________________________ AIDES CMG___________________________________________

      // ________________________________ AIDES PAJE___________________________________

      aides.find(
        { dateDebutAnnee: req.body.dateDebutAnnee },
        function (err, taux) {
          const enfantPlusJeune = req.body.enfantPlusJeune

          taux.map(val => {

            if (enfantPlusJeune < 3) {
              // aidesPaje = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * req.body.repartitionFamille * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation03)
              aidesPaje = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation03)
            }
            else {
              // aidesPaje = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * req.body.repartitionFamille * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation36)
              aidesPaje = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation36)
            }

            async function funcDeductionForfaitaireChargesSociales() {
              return deductionForfaitaireChargesSociales = Math.ceil(Math.min((heuresMensuelles * 0.9 + heuresMensuellesMajorees) * val.abattementParHeure, chargesPatronalesSS * req.body.repartitionFamille))
            }
            funcDeductionForfaitaireChargesSociales().then(console.log)

            async function funcMontantAPayer() {
              return montantAPayer = coutPatronalFamilleA - deductionForfaitaireChargesSociales - aidesPaje - cmg
            }
            funcMontantAPayer().then(console.log)

            if (req.body.premiereAnneeEmploiDomicile) {
              if (req.body.gardeAlternee) {
                async function funcCreditImpotAnnuelFamilleA(){
                  return creditImpotAnnuelFamilleA = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges * 0.5, val.maxCreditImpot), (montantAPayer - primePanierRepas + remboursementMensuelTransport) * 12 * val.tauxCreditImpot
                )}
                funcCreditImpotAnnuelFamilleA().then(console.log)
              } else {
                async function funcCreditImpotAnnuelFamilleA(){
                  return creditImpotAnnuelFamilleA = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges, val.maxCreditImpot), (montantAPayer - primePanierRepas + remboursementMensuelTransport) * 12 * val.tauxCreditImpot
                )}
                funcCreditImpotAnnuelFamilleA().then(console.log)
              }
            } else {
              if (req.body.gardeAlternee) {
                creditImpotAnnuelFamilleA = Math.min(Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges * 0.5, val.maxCreditImpot), (montantAPayer - primePanierRepas + remboursementMensuelTransport) * 12 * val.tauxCreditImpot
                )
              } else {
                creditImpotAnnuelFamilleA = Math.min(Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges, val.maxCreditImpot), (montantAPayer - primePanierRepas + remboursementMensuelTransport) * 12 * val.tauxCreditImpot
                )
              }
            }
            async function funcCreditImpotMensuelFamilleA(){
              return creditImpotMensuelFamilleA = creditImpotAnnuelFamilleA / 12
            }
            funcCreditImpotMensuelFamilleA()
          })

          res.send({
            chargesPatronalesFamilleA,
            chargesSalarialesFamilleA,
            chargesPatronalesSS,
            netMensuelFamilleA,
            coutPatronalFamilleA,
            cmg,
            primePanierRepas,
            remboursementMensuelTransport,
            creditImpotAnnuelFamilleA,
            creditImpotMensuelFamilleA,
            netMensuelTotal,
            netHoraire,
            brutAnnuelTotalFamille,
            netAnnuelTotalFamille,
            netMensuelAvantageFamilleA,
            montantAPayer,
            deductionForfaitaireChargesSociales,
            aidesPaje
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


