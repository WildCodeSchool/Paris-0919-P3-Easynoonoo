const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 4000;
const { TauxCharge } = require('./db/models')

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

    collection.find({qty: 15}).toArray(function (err, data) {
      console.log(data);
    })

    // _______ METHOD TO INSERT DATa IN MONGO DB_______

    // collection.insert( { name: "card" } )
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})
