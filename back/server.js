const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const { tauxChargesEmployes } = require('./models/chargesEmployes')
const { tauxChargesEmployeurs } = require('./models/chargesEmployeurs')
const { cmgs } = require('./models/cmgs')

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

app.post('/api/taux/employes', function (req, res) {

  tauxChargesEmployes.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

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

      /*--------------------------------------------------*/

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

        let chargesTotal =
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

        res.send({
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
        })
      })
    },
  )
})

app.post('/api/taux/employeurs', function (req, res) {

  tauxChargesEmployeurs.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {
      console.log('ça marche')

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

      /*--------------CALCUL SALAIRE NET-------------*/

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

        let chargesPatronales =
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

        res.send({ "charges patronales": chargesPatronales })
      }
      )
    }
  )
})

// _________ CALCULS DES AIDES _______

app.post('/api/aides/employes', function (req, res) {

  cmgs.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {

      /* req.body.nbEnfants
      req.body.enfantPlusJeune
      req.body.ressourcesAnnuelles
      req.body.parentIsole */

      const age = req.body.enfantPlusJeune
      const nbChild = req.body.nbEnfants
      const isIsole = req.body.parentIsole
      const money = req.body.ressourcesAnnuelles
      let palier = []

      taux.map(val => {

        // ________________ PALIER 1 ___________________

        if (
          ((nbChild === 1 ) && (3 <= age <= 6) && isIsole == false && (money > 46123)) ||
          ((nbChild === 2 ) && (3 <= age <= 6) && isIsole == false && (money > 52670)) ||
          ((nbChild === 3 ) && (3 <= age <= 6) && isIsole == false && (money > 59217)) ||
          ((nbChild === 4 ) && (3 <= age <= 6) && isIsole == false && (money > 65764))
          ) {
          palier.push(val.palier1)
        } else if (
          ((nbChild === 1 ) && (3 <= age <= 6) && isIsole == false && (20755 <= money <= 46123)) 
          ||
          ((nbChild === 2 ) && (3 <= age <= 6) && isIsole == false && (23701 <= money <= 52670)) 
          ||
          ((nbChild === 3 ) && (3 <= age <= 6) && isIsole == false && (26647 <= money <= 59217)) 
          ||
          ((nbChild === 4 ) && (3 <= age <= 6) && isIsole == false && (29593 <= money <= 65764))
        ){
          palier.push(val.palier2)
        }

      })
    })
})
// _______ APP LISTEN _______

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})
