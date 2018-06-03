'use strict';
require('dotenv').load();

var nconf = require('nconf');

nconf.env(['PORT', 'NODE_ENV'])
  .argv({
    'e': {
      alias: 'NODE_ENV',
      describe: 'Set production or development mode.',
      demand: false,
      default: 'development'
    },
    'p': {
      alias: 'PORT',
      describe: 'Port to run on.',
      demand: false,
      default: 3000
    },
    'n': {
      alias: "neo4j",
      describe: "Use local or remote neo4j instance",
      demand: false,
      default: "local"
    }
  })
  .defaults({
    'DB_USERNAME': process.env.DB_USERNAME,
    'DB_PASSWORD': process.env.DB_PASSWORD,
    'DB_NAME': process.env.DB_NAME,
    'neo4j': 'local',
    'neo4j-local': 'bolt://localhost:7687',
    'neo4j-remote': process.env.DB_REMOTE
  });
module.exports = nconf;

// const dbDetails = {
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST
// }

// module.exports = {
//   development: dbDetails,
//   production: dbDetails
// }