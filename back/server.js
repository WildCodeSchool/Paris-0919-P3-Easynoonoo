const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { tauxChargesEmployes } = require('./models/chargesEmployes')
// const chargesEmployesSchema = require('./models/chargesEmployes')
// const chargesEmployes = mongoose.model('chargesEmployes', tauxChargesEmployes, 'chargesEmployes')

const port = 4000;

const app = express()
app.use(cors());
app.use(bodyParser.json());

// ____________ REMOTE DB ROUTE ______________

const dbRoute = "mongodb+srv://easynoonoo:easynoonoo@cluster0-mznsf.azure.mongodb.net/easynoonooDB?retryWrites=true&w=majority";

// ____________ CHECK YOUR CONNECTION TO MONGO DB REMOTE ______________

mongoose.connect(dbRoute, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

// ____________ QUERY METHOD ______________

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
  mongoose.connection.db.collection("easynoonooCollection", function (err, collection) {

    //function to request collection in mongo DB

    collection.find({ name: 'card' }).toArray(function (err, data) {
      console.log(data);
    })

    // _______ METHOD TO INSERT Data IN MONGO DB_______

    // collection.insert({ })

  });
});

async function createTranche(maladieMaterniteInvaliditeDeces) {
  return new tauxChargesEmployes({
    maladieMaterniteInvaliditeDeces
  }).save()
}

async function findTranche(maladieMaterniteInvaliditeDeces) {
  return await tauxChargesEmployes.findOne({ maladieMaterniteInvaliditeDeces })
}

; (async () => {
  const connector = mongoose.connect(dbRoute)
  const maladieMaterniteInvaliditeDeces = process.argv[2].split('=')[1]

  let user = await connector.then(async () => {
    return findTranche(maladieMaterniteInvaliditeDeces)
  })

  if (!user) {
    user = await createTranche(maladieMaterniteInvaliditeDeces)
  }

  console.log(user)
  process.exit(0)
})()

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})
