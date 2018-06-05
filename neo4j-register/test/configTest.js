var expect = require('chai').expect;
var nconf = require('../config/config.js');

describe('config', () => {
  it('returns config for connecting to neo4j', () => {
    expect(nconf.get('DB_USERNAME')).to.be.equal('neo4j');
    expect(nconf.get('DB_PASSWORD')).to.be.equal('faas');
    expect(nconf.get('DB_NAME')).to.be.equal('faas');
    expect(nconf.get('neo4j')).to.be.equal('local');
    expect(nconf.get('neo4j-local')).to.be.equal('bolt://localhost:7687');
    expect(nconf.get('neo4j-remote')).to.be.equal('bolt://localhost:7687');
  })
})