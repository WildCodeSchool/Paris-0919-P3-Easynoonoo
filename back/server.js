const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const { tauxChargesEmployes } = require('./models/chargesEmployes')
// const chargesEmployesSchema = require('./models/chargesEmployes')
// const chargesEmployes = mongoose.model('chargesEmployes', tauxChargesEmployes, 'chargesEmployes')

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

// ____________ QUERY METHOD ______________

// mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
// mongoose.connection.once('open', function () {
//   mongoose.connection.db.collection("easynoonooCollection", function (err, collection) {

//     //function to request collection in mongo DB

//     collection.find({ name: 'card' }).toArray(function (err, data) {
//       console.log(data);
//     })
//   });
// });

/* -------------- GET TAUX INFOS ----------------- */

/* -------------- TAUX EMPLOYES ----------------- */
app.post('/api/taux/employes', function(req, res) {
  tauxChargesEmployes.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function(err, taux) {
      console.log('req.body =>', req.body.dateDebutAnnee)

      const arrayTr = []

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
      console.log('test', salaireBrutMensuel)
      res.status(200).send({ salaireBrutMensuel })
      /*--------------------------------------------------*/
      /*--------------CALCUL ASSIETTE CSG RDS-------------*/
      const brutAnnuel = salaireBrutMensuel * 12
      const PMSS = 3377
      let assietteCsgRds =
        98.25 * 0.01 * Math.min(4 * PMSS, brutAnnuel) +
        Math.max(0, brutAnnuel - 4 * PMSS)
      console.log('asiette', assietteCsgRds)

      /*--------------------------------------------------*/
      taux.map(val => {
        if (req.body.trancheA) {
          console.log('ici if')
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
          )
        } else {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrB,
            val.CegTrB,
            val.CetTrB,
          )
        }
      })
    },
  )
})

// _______ APP LISTEN _______

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})

// _____________ INSERT INTO DB _____________________

// async function createTranche(maladieMaterniteInvaliditeDeces) {
//   return new tauxChargesEmployes({
//     maladieMaterniteInvaliditeDeces
//   }).save()
// }

// async function findTranche(maladieMaterniteInvaliditeDeces) {
//   return await tauxChargesEmployes.findOne({ maladieMaterniteInvaliditeDeces })
// }

// ; (async () => {
//   const connector = mongoose.connect(dbRoute)
//   const maladieMaterniteInvaliditeDeces = process.argv[2].split('=')[1]

//   let user = await connector.then(async () => {
//     return findTranche(maladieMaterniteInvaliditeDeces)
//   })

//   if (!user) {
//     user = await createTranche(maladieMaterniteInvaliditeDeces)
//   }

//   console.log('COLLECTION', user)
//   process.exit(0)})
