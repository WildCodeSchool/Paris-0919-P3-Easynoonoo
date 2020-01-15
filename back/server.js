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
  const PMSS = 3377
  let assietteCsgRdsMensuel =
    98.25 * 0.01 * Math.min(4 * PMSS, salaireBrutMensuel) +
    Math.max(0, salaireBrutMensuel - 4 * PMSS)

  let assietteCsgRdsHoraire = 98.25 * 0.01 * req.body.tauxHoraire

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

  tauxChargesEmployes.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      /*--------------CALCUL SALAIRE NET-------------*/

      const arrayTr = []
      taux.map(val => {
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
        netHoraire = Math.round((req.body.tauxHoraire -
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

        chargesTotal =
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
          + (heuresMensuellesMajorees * tauxHeuresSupp * req.body.tauxHoraire * (0.01 * val.exonerationDesCotisations))

        netMensuelTotal = Math.round((salaireBrutMensuel - chargesTotal) * 100) / 100
        netMensuelFamilleA = Math.round((netMensuelTotal * req.body.repartitionFamille) * 100) / 100
        netMensuelFamilleB = (netMensuelTotal * (1 - req.body.repartitionFamille))
        brutAnnuelTotal = Math.round((salaireBrutMensuel * 12) * 100) / 100
        netAnnuelTotal = Math.round((netMensuelTotal * 12) * 100) / 100
        netAnnuelTotalFamille = netAnnuelTotal * req.body.repartitionFamille
        chargesSalarialesFamilleA = Math.round((brutMensuelFamilleA - netMensuelFamilleA) * 100) / 100
        brutAnnuelTotalFamille = brutAnnuelTotal * req.body.repartitionFamille


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



        chargesPatronalesFamilleA =
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


        chargesPatronalesSS = Math.round(((val.maladieMaterniteInvaliditeDeces +
          val.assuranceVieillesseDeplafonnee +
          val.vieillessePlafonnee +
          val.accidentDuTravail +
          val.allocationsFamiliales) * salaireBrutMensuel * req.body.repartitionFamille * 0.01) * 100) / 100

        primePanierRepas = Math.round((val.joursOuvres

          - req.body.joursCP - req.body.joursRecup) * (req.body.joursTravaillesSemaines / 5) / 12 * req.body.montantRepas * req.body.repartitionFamille) * 100 / 100

        remboursementMensuelTransport = req.body.montantAbonnementTransports * req.body.priseEnChargeAbonnement * req.body.repartitionFamille

        setInterval(() => {
          netMensuelAvantageFamilleA = Math.round((netMensuelFamilleA + primePanierRepas + remboursementMensuelTransport) * 100) / 100
          coutPatronalFamilleA = Math.round((chargesPatronalesFamilleA + chargesSalarialesFamilleA + netMensuelAvantageFamilleA) * 100) / 100
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
      cmgArray = []

      taux.map(val => {

        // ________________________________ AIDES CMG___________________________________

        if (val.ageEnfant1 <= age && age <= val.ageEnfant2) {
          switch (nbChild) {
            case 1:  // 1 enfant entre 3 et 6 ans
              if (money > val.revenusE) {
                cmgArray.push(val.cmgPalier1) // 88.68
              }
              else if (val.revenusA <= money && money <= val.revenusE) {
                cmgArray.push(val.cmgPalier2) // 147.83
              }
              else {
                cmgArray.push(val.cmgPalier4) // 234.41
              }
            case 2: // 2 enfant entre 3 et 6 ans
              if (money > val.revenusF) {
                cmgArray.push(val.cmgPalier1) // 88.68
              }
              else if (val.revenusB <= money && money <= val.revenusF) {
                cmgArray.push(val.cmgPalier2) // 147.83
              }
              else {
                cmgArray.push(val.cmgPalier4) // 234.41
              }
            case 3: // 3 enfant entre 3 et 6 ans
              if (money > val.revenusG) {
                cmgArray.push(val.cmgPalier1) // 88.68
              }
              else if (val.revenusC <= money && money <= val.revenusG) {
                cmgArray.push(val.cmgPalier2) // 147.83
              }
              else {
                cmgArray.push(val.cmgPalier4) // 234.41
              }
            case 4: // 4 enfant entre 3 et 6 ans
              if (money > val.revenusH) {
                cmgArray.push(val.cmgPalier1) // 88.68
              }
              else if (val.revenusD <= money && money <= val.revenusH) {
                cmgArray.push(val.cmgPalier2) // 147.83
              }
              else {
                cmgArray.push(val.cmgPalier4) // 234.41
              }
          }
        } else {
          switch (nbChild) {
            case 1: // 1 enfant de moins de 3 ans
              if (money > val.revenusE) {
                cmgArray.push(val.cmgPalier3) // 177.35
              }
              else if (val.revenusA <= money && money <= val.revenusE) {
                cmgArray.push(val.cmgPalier5) // 295.62
              }
              else {
                cmgArray.push(val.cmgPalier6) // 468.82
              }
            case 2: // 2 enfant de moins de 3 ans
              if (money > val.revenusF) {
                cmgArray.push(val.cmgPalier3) // 177.35
              }
              else if (val.revenusB <= money && money <= val.revenusF) {
                cmgArray.push(val.cmgPalier5) // 295.62
              }
              else {
                cmgArray.push(val.cmgPalier6) // 468.82
              }
            case 3: // 3 enfant de moins de 3 ans
              if (money > val.revenusG) {
                cmgArray.push(val.cmgPalier3) // 177.35
              }
              else if (val.revenusC <= money && money <= val.revenusG) {
                cmgArray.push(val.cmgPalier5) // 295.62
              }
              else {
                cmgArray.push(val.cmgPalier6) // 468.82
              }
            case 4: // 4 enfant de moins de 3 ans
              if (money > val.revenusH) {
                cmgArray.push(val.cmgPalier3) // 177.35
              }
              else if (val.revenusD <= money && money <= val.revenusH) {
                cmgArray.push(val.cmgPalier5) // 295.62
              }
              else {
                cmgArray.push(val.cmgPalier6) // 468.82
              }
          }
        }

        if (isIsole == false) {
          cmg = cmgArray[0]

        } else {
          cmg = cmgArray[0] + cmgArray[0] * val.tauxParentsIsole * 0.01
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
              aidesPaje = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * req.body.repartitionFamille * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation03)
            }
            else {
              aidesPaje = Math.min((chargesPatronalesFamilleA + chargesSalarialesFamilleA) * req.body.repartitionFamille * val.tauxDeParticipationCotisationsSociales, val.plafondParticipationCotisation36)
            }


            deductionForfaitaireChargesSociales = Math.ceil(Math.min((heuresMensuelles * 0.9 + heuresMensuellesMajorees) * val.abattementParHeure, chargesPatronalesSS * req.body.repartitionFamille))

            montantAPayer = coutPatronalFamilleA - deductionForfaitaireChargesSociales - aidesPaje - cmg




            if (req.body.premiereAnneeEmploiDomicile) {
              if (req.body.gardeAlternee) {
                creditImpotAnnuelFamilleA = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges * 0.5, val.maxCreditImpot), (montantAPayer - primePanierRepas + remboursementMensuelTransport) * 12 * val.tauxCreditImpot
                )
              } else {
                creditImpotAnnuelFamilleA = Math.min(val.majorationPremiereAnneeEmploiADomicile + Math.min(val.plafondCreditImpot + val.majorationParEnfantACharges, val.maxCreditImpot), (montantAPayer - primePanierRepas + remboursementMensuelTransport) * 12 * val.tauxCreditImpot
                )


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


            creditImpotMensuelFamilleA = creditImpotAnnuelFamilleA / 12



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


