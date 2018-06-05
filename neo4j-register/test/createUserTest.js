const expect = require('chai').expect;
const register = require('../createUser.js');
const dbUtils = require('../neo4j/dbUtils');

describe('createUser', () =>{
  it('registers a user', () =>{
    context = {}
    session = dbUtils.getSession(context)

    session.run('MATCH(n: User { username: "neoFaas"}) DELETE n')
    register.createUser(session, "neoFaas", "faas").then(res => {
      expect(res.properties.username).to.be.equal('neoFaas');
      process.exit(1)
    })
  })
})
