require('dotenv').config()

let PORT = process.env.PORT
let DATABASE_URL = process.env.DATABASE_URL
let SECRET = process.env.SECRET

module.exports = {
  DATABASE_URL,
  PORT,
  SECRET
}
