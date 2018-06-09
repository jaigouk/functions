var expect = require('chai').expect;
var nconf = require('../config/config.js');

describe('config', () => {
  it('returns config for connecting to neo4j', () => {
    expect(nconf.get('DB_USERNAME')).to.be.equal(process.env.DB_USERNAME);
    expect(nconf.get('DB_PASSWORD')).to.be.equal(process.env.DB_PASSWORD);
    expect(nconf.get('DB_NAME')).to.be.equal(process.env.DB_NAME);
    expect(nconf.get('neo4j')).to.be.equal('local');
  })
})