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

    let chargesPatronales = null
    let chargesFamilleA = null

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
        let netHoraire = req.body.tauxHoraire -
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
              val.CrdsNonDeductible)))

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
        
        let netMensuelTotal = salaireBrutMensuel - chargesTotal
        let netMensuelFamilleA = (netMensuelTotal * req.body.repartitionFamille)
        let netMensuelFamilleB = (netMensuelTotal * (1 - req.body.repartitionFamille))
        let brutAnnuelTotal = salaireBrutMensuel * 12
        let netAnnuelTotal = netMensuelTotal * 12
        chargesFamilleA = brutMensuelFamilleA - netMensuelFamilleA

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          "brutMensuelFamilleA": brutMensuelFamilleA,
          "netMensuelFamilleA": netMensuelFamilleA,
          "brutMensuelFamilleB": brutMensuelFamilleB,
          "netMensuelFamilleB": netMensuelFamilleB,
          "brutHoraireTotal": req.body.tauxHoraire,
          "netHoraireTotal": netHoraire,
          "netMensuelTotal": netMensuelTotal,
          "brutMensuelTotal": salaireBrutMensuel,
          "netAnnuelTotal": netAnnuelTotal,
          "brutAnnuelTotal": brutAnnuelTotal
        }))
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

        chargesPatronales =
          (salaireBrutMensuel * req.body.repartitionFamille * 0.01 * (
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
          ))

        res.write(JSON.stringify({ "charges patronales": chargesPatronales,
      "chargesPatronalesAnnuelles" :  chargesPatronales * 12}))
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
      let palier = []

      taux.map(val => {

        // ________________________________ AIDES CMG___________________________________

        if (
          ((nbChild === 1) && (3 <= age <= 6) && (money > 46123)) ||
          ((nbChild === 2) && (3 <= age <= 6) && (money > 52670)) ||
          ((nbChild === 3) && (3 <= age <= 6) && (money > 59217)) ||
          ((nbChild === 4) && (3 <= age <= 6) && (money > 65764))
        ) {
          palier.push(val.palier1) // 88.68
        } else if (
          ((nbChild === 1) && (3 <= age <= 6) && (20755 <= money <= 46123)) ||
          ((nbChild === 2) && (3 <= age <= 6) && (23701 <= money <= 52670)) ||
          ((nbChild === 3) && (3 <= age <= 6) && (26647 <= money <= 59217)) ||
          ((nbChild === 4) && (3 <= age <= 6) && (29593 <= money <= 65764))
        ) {
          palier.push(val.palier2) // 147.83
        } else if (
          ((nbChild === 1) && (age < 3) && (money > 46123)) ||
          ((nbChild === 2) && (age < 3) && (money > 52670)) ||
          ((nbChild === 3) && (age < 3) && (money > 59217)) ||
          ((nbChild === 4) && (age < 3) && (money > 65764))
        ) {
          palier.push(val.palier3) // 177.35
        } else if (
          ((nbChild === 1) && (3 <= age <= 6) && (money <= 20755)) ||
          ((nbChild === 2) && (3 <= age <= 6) && (money <= 23701)) ||
          ((nbChild === 3) && (3 <= age <= 6) && (money <= 26647)) ||
          ((nbChild === 4) && (3 <= age <= 6) && (money <= 29593))
        ) {
          palier.push(val.palier4) // 234.41
        } else if (
          ((nbChild === 1) && (age < 3) && (20755 <= money <= 46123)) ||
          ((nbChild === 2) && (age < 3) && (23701 <= money <= 52670)) ||
          ((nbChild === 3) && (age < 3) && (26647 <= money <= 59217)) ||
          ((nbChild === 4) && (age < 3) && (29593 <= money <= 65764))
        ) {
          palier.push(val.palier5) // 295.62
        } else if (
          ((nbChild === 1) && (age < 3) && (money <= 20755)) ||
          ((nbChild === 2) && (age < 3) && (money <= 23701)) ||
          ((nbChild === 3) && (age < 3) && (money <= 26647)) ||
          ((nbChild === 4) && (age < 3) && (money <= 29593))
        ) {
          palier.push(val.palier6) // 468.82
        }
        if (isIsole == false) {
          res.write(JSON.stringify({ palier: palier[0] }))
        } else {
          res.write(JSON.stringify({ palier: palier[0] + palier[0] * val.tauxParentsIsole * 0.01 }))
        }
      })


      // ________________________________________ AIDES CMG___________________________________________

       // ________________________________ AIDES PAJE___________________________________

      aides.find(
        { dateDebutAnnee: req.body.dateDebutAnnee },
        function (err, taux) {
        const enfantPlusJeune = req.body.enfantPlusJeune
        const tauxParticipationCotisations = req.body.tauxParticipationCotisations
        console.log(chargesFamilleA)
        taux.map(val=> {

          if (enfantPlusJeune < 3){
            res.write(JSON.stringify({ 'aidesPaje' : Math.min((chargesPatronales + chargesFamilleA) * req.body.repartitionFamille * tauxParticipationCotisations, val.plafondParticipationCotisation03) }))
          }
          else 
          {
            res.write(JSON.stringify({ 'aidesPaje' : Math.min((chargesPatronales + chargesFamilleA) * req.body.repartitionFamille * tauxParticipationCotisations, val.plafondParticipationCotisation36) }))
          }

        })
      
        res.end()
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
