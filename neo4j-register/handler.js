"use strict"
var dbUtils = require('./neo4j/dbUtils');
var uuid = require('node-uuid');

function hashPassword(username, password) {
    var s = username + ':' + password;
    return crypto.createHash('sha256').update(s).digest('hex');
}

module.exports = (req, callback) => {
    session = dbUtils.getSession(req)

    return session.run('MATCH (user:User {username: {username}}) RETURN user', {
            username: username
        })
        .then(results => {
            if (!_.isEmpty(results.records)) {
                throw {
                    username: 'username already in use',
                    status: 400
                }
            } else {
                return session.run('CREATE (user:User {id: {id}, username: {username}, password: {password}, api_key: {api_key}}) RETURN user', {
                    id: uuid.v4(),
                    username: username,
                    password: hashPassword(username, password),
                    api_key: randomstring.generate({
                        length: 20,
                        charset: 'hex'
                    })
                }).then(results => {
                    return new User(results.records[0].get('user'));
                })
            }
        });
}
