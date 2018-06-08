"use strict"

const uuid = require('uuid');
const _ = require('lodash')
const crypto = require('crypto');
const randomstring = require("randomstring");
const dbUtils = require('./neo4j/dbUtils');

function hashPassword(username, password) {
  var s = username + ':' + password;
  return crypto.createHash('sha256').update(s).digest('hex');
}

var checkExistingUser = (session, username) => {
  return session.run('MATCH (user:User {username: {username}}) RETURN user', {
    username: username
  })
}

var insertUser = (session, username, password) => {
  return session.run('CREATE (user:User {id: {id}, username: {username}, password: {password}, api_key: {api_key}}) RETURN user', {
    id: uuid.v4(),
    username: username,
    password: hashPassword(username, password),
    api_key: randomstring.generate({
      length: 20,
      charset: 'hex'
    })
  })
}

exports.createUser = async (session, username, password) => {
  let check = await checkExistingUser(session, username)

  if (!_.isEmpty(check.records)) {
    throw {
      username: 'username already in use',
      status: 400
    }
  } else {
    let results = await insertUser(session, username, password)
    return results.records[0].get('user')

  }

}
