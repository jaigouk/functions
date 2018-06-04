var expect = require('chai').expect;
var dbUtils = require('../neo4j/dbUtils');
var uuid = require('node-uuid');

// https: //scotch.io/tutorials/nodejs-tests-mocking-http-requests
// const nock = require('nock')

describe('getSession', function () {
  it('returns ne4jSession', function () {
    context = {}
    session = dbUtils.getSession(context)

    session.run('CREATE (user:User { id: {id}, username: "Emil", klout: 99 }) RETURN user',
    {
      id: uuid.v4(),
      username: "Email"
    }
    ).then(function (results) {
      res = results.records[0].get('user');
      expect(res.properties.klout.low).to.be.equal(99);
      expect(res.properties.username).to.be.equal('Emil');
      expect(res.properties.id).to.exist;
      session.close()
      process.exit(1)
    })

  })
})
