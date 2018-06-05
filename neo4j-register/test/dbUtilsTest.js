var expect = require('chai').expect;
var dbUtils = require('../neo4j/dbUtils');
var uuid = require('node-uuid');

describe('getSession', function () {
  it('can run cypher on it', function () {
    context = {}
    session = dbUtils.getSession(context)

    expect(session._open).to.be.true
    expect(session._mode).to.be.equal('WRITE')
  })
})
