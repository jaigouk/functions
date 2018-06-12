const uuid = require('uuid');
const expect = require('chai').expect;
const crypto = require('crypto')
const randomstring = require("randomstring")
const Handler = require('../handler.js');
const dbUtils = require('../neo4j/dbUtils');

function hashPassword(username, password) {
  let s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

describe('handler', () => {
  it('registers a user', async () => {
    const context = {}
    const session = dbUtils.getSession(context)
    await session.run('MATCH(n: User { username: "faas"}) DELETE n')
    await session.run('CREATE (user:User {id: {id}, username: {username}, password: {password}, api_key: {api_key}}) RETURN user', {
      id: uuid.v4(),
      username: 'faas',
      password: hashPassword('faas', 'faas'),
      api_key: randomstring.generate({
        length: 20,
        charset: 'hex'
      })
    })

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
    expect(res.token.length).to.be.equal(20)
    session.close()
  })
})
