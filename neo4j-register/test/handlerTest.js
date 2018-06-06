var expect = require('chai').expect;
var Handler = require('../handler.js');
const dbUtils = require('../neo4j/dbUtils');

describe('handler', () => {
  it('registers a user', () => {
    context = {}
    session = dbUtils.getSession(context)
    session.run('MATCH(n: User { username: "faas"}) DELETE n')
    // process.exit(1)
    let req = {'body': {'username': 'faas', 'password': 'faas'}}
    Handler(req, console.log)
  })
})
