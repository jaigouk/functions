"use strict"

const dbUtils = require('./neo4j/dbUtils');
const register = require('./createUser.js');
const _ = require('lodash')

module.exports = async (req, callback) => {
  let username = _.get(req.body, 'username');
  let password = _.get(req.body, 'password');

  if (!username) {
    throw {
      username: 'This field is required.',
      status: 400
    };
  }
  if (!password) {
    throw {
      password: 'This field is required.',
      status: 400
    };
  }

  let session = dbUtils.getSession(req)
  let res = await register.createUser(session, username, password)
  callback(res)
}
