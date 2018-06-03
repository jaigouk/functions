var dotenv = require('dotenv');
dotenv.config()
const dbDetails = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
}

module.exports = {
  development: dbDetails,
  production: dbDetails
}