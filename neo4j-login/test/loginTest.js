const uuid = require('uuid')
const expect = require('chai').expect
const crypto = require('crypto')
const randomstring = require("randomstring")
const users = require('../login.js')
const dbUtils = require('../neo4j/dbUtils')

function hashPassword(username, password) {
  let s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

describe('login', () => {
  before(async () =>{
    const context = {}
    const session = dbUtils.getSession(context)
    await session.run('MATCH(n: User { username: "jayz"}) DELETE n')
    await session.run('CREATE (user:User {id: {id}, username: {username}, password: {password}, api_key: {api_key}}) RETURN user', {
      id: uuid.v4(),
      username: "jayz",
      password: hashPassword("jayz", "jayz2341"),
      api_key: randomstring.generate({
        length: 20,
        charset: 'hex'
      })
    })
  })

  it('returns token', async () => {
    const context = {}
    const session = dbUtils.getSession(context)
    const res = await users.login(session, "jayz", "jayz2341")
    expect(res.token.length).to.be.equal(20)
    session.close()
  })

  it('throws error for non user', async () => {
    const context = {}
    const session = dbUtils.getSession(context)
    try {
      await users.login(session, "jayz2", "jayz2341")
    } catch (e) {
      expect(e.status).to.be.equal(400)
      expect(e.username).to.be.equal('username does not exist')
    }
    session.close()
  })

  it('throws error for wrong pass', async () => {
    const context = {}
    const session = dbUtils.getSession(context)
    try {
      await users.login(session, "jayz", "jayz2340")
    } catch (e) {
      expect(e.status).to.be.equal(400)
      expect(e.password).to.be.equal('wrong password')
    }
    session.close()
  })
})
