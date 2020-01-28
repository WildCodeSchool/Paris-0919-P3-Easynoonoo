const mysql = require('mysql')

require('dotenv').config(process.cwd(), '.env') // REQUIRE 'dotenv" with this line

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

connection.connect(function(err) {
  if (!err) {
    console.log('Database is connected')
  } else {
    console.log('Error connecting database', err)
  }
})

module.exports = connection
