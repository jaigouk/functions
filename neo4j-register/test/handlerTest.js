var expect = require('chai').expect;
var Handler = require('../handler.js');
const dbUtils = require('../neo4j/dbUtils');

describe('handler', () => {
  it('registers a user', async () => {
    const context = {}
    const session = dbUtils.getSession(context)
    await session.run('MATCH(n: User { username: "faas"}) DELETE n')
    const req = {
      'body': {
        'username': 'faas',
        'password': 'faas'
      }
    }
    let res = "temp"
    const assign = (input) => {
      res = input
    }
    await Handler(req, assign)

    expect(res.properties.username).to.be.equal('faas')
  })
})
