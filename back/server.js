const express = require('express')
const connection = require('./config/config')
// const router = express.Router()

const app = express()

const port = 4000

app.get('/api/user', (req, res) => {
  // connection à la base de données, et sélection
  connection.query('SELECT * from user', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films')
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results)
    }
  })
})

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})
