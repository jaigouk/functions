var expect = require('chai').expect;
var register = require('../createUser.js');
var dbUtils = require('../neo4j/dbUtils');

describe('createUser', function () {
  it('registers a user', function () {
    context = {}
    session = dbUtils.getSession(context)

    session.run('MATCH(n: User { username: "neoFaas"}) DELETE n')
    register.createUser(session, "neoFaas", "faas")
    session.close()
  })
})
