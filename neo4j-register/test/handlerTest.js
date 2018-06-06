var expect = require('chai').expect;
var Handler = require('../handler.js');
const dbUtils = require('../neo4j/dbUtils');

describe('handler', () => {
  it('registers a user', () => {
    context = {}
    session = dbUtils.getSession(context)
    session.run('MATCH(n: User { username: "faas"}) DELETE n').then(r => {
      let req = {
        'body': {
          'username': 'faas',
          'password': 'faas'
        }
      }
      Handler(req, console.log)
    })

    session.run('MATCH(n: User { username: "faas"}) RETURN n').then(res => {
      expect(res.properties.username).to.be.equal('faas');
    })

  })
})
