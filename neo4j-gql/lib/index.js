const {
  graphql
} = require('graphql');

const {
  makeExecutableSchema
} = require('graphql-tools');
const typeDefs = require('./types/index');
const resolvers = require('./resolvers/index');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

function runGraphQL(event, cb) {

  let query = event.query;

  graphql(schema, query).then(function (result) {
    return cb(null, result);
  }).catch(error => {
    const e = {
      errors: [{
        message: error.message,
        state: error.originalError && error.originalError.state,
        locations: error.locations,
        path: error.path,
      }]
    }
    return cb(JSON.stringify(e), null);
  });

}

module.exports = {
  runGraphQL,
}