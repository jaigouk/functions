const expect = require('chai').expect;
const register = require('../createUser.js');
const dbUtils = require('../neo4j/dbUtils');

describe('createUser', () =>{
  it('registers a user', async() => {
    const context={}
    const session = dbUtils.getSession(context)
    await session.run('MATCH(n: User { username: "neoFaas"}) DELETE n')
    session.close()
    const res = await register.createUser(session, "neoFaas", "faas")
    expect(res.properties.username).to.be.equal('neoFaas')
  })
});

