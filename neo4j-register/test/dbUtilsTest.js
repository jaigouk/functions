const expect = require('chai').expect;
const dbUtils = require('../neo4j/dbUtils');

describe('getSession', () => {
  it('can run cypher on it', () => {
    context = {}
    session = dbUtils.getSession(context)

    expect(session._open).to.be.true
    expect(session._mode).to.be.equal('WRITE')
  })
})
