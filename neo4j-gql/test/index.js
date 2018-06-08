var expect = require('chai').expect;
var config = require('../config/config.js');

describe('config', function () {
  it('returns config for connecting to neo4j', function(){
    console.log(config.development.username)
    expect(config.development.username).to.be.equal(process.env.DB_USERNAME);
    expect(config.development.password).to.be.equal(process.env.DB_PASSWORD);
    expect(config.development.host).to.be.equal('localhost');
  })
})