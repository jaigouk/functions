var expect = require('chai').expect;
var getSession = require('../neo4j/dbUtils.js').getSession;
// https: //scotch.io/tutorials/nodejs-tests-mocking-http-requests
const nock = require('nock')

describe('getSession', function () {
  it('returns ne4jSession', function () {
    context = {}
    console.log(getSession(context))
  })
})
