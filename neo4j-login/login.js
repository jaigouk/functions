"use strict"
const _ = require('lodash')
const crypto = require('crypto')

const hashPassword = (username, password) => {
  var s = username + ':' + password;
  return crypto.createHash('sha256').update(s).digest('hex');
}

const findUser = (session, username) => {
  return session.run('MATCH (user:User {username: {username}}) RETURN user', {
    username: username
  })
}

exports.login = async (session, username, password) => {
  let results = await findUser(session, username)

  if (_.isEmpty(results) || _.isEmpty(results.records)) {
    throw {
      username: 'username does not exist',
      status: 400
    }
  } else {
    var dbUser = _.get(results.records[0].get('user'), 'properties');
    if (dbUser.password != hashPassword(username, password)) {
      throw {
        password: 'wrong password',
        status: 400
      }
    }
    return {
      token: _.get(dbUser, 'api_key')
    };
  }
}
