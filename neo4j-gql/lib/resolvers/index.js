import {
  v1 as neo4j
} from 'neo4j-driver';
import jwt from 'jsonwebtoken';

const resolvers = {
  Mutation: {
    createUser: async (root, {
        credential
      }) => {
        if (credential.email !== 'test@test.com') {
          throw new Error('Credential validation error');
        }
        const user = {
          email: 'test@test.com',
          name: 'Test Users'
        }
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
        return {
          token,
          ...user
        };
      }
  },
  Query: {
    info: () => `This is referencely where people change how they get a job.`,
    postsByTitle: (root, args, context) => {
      let session = context.driver.session();
      let query = "MATCH (post:Post) WHERE post.title CONTAINS $subString RETURN post LIMIT $first;"
      return session.run(query, args)
        .then(result => {
          return result.records.map(record => {
            return record.get("post").properties
          })
        })
    }
  },
  Post: {
    tags: (post, _, context) => {
      let session = context.driver.session();
      let params = {
        postId: post.postId
      };
      let query = `
        MATCH(p: Post) - [:IN_TAG] - > (t: Tag)
        WHERE p.postId = $postId
        RETURN t.name AS tag
      `;
      return session.run(query, params)
        .then(result => {
          return result.records.map(record => {
            return record.get("tag")
          })
        })
    },
    similar: (post, _, context) => {
      let session = context.driver.session();
      let params = {
        postId: post.postId
      };
      let query = `
				MATCH (p:Post) WHERE p.postId = $postId
        MATCH (p)-[:IN_TAG]->(p:Tag)<-[:IN_TAG]-(post:Post)
        WITH p, post, COUNT(*) AS genreOverlap
        MATCH (p)<-[:RATED]-(:User)-[:RATED]->(post:Post)
        WITH post,genreOverlap, COUNT(*) AS userRatedScore
        RETURN post ORDER BY (0.9 * genreOverlap) + (0.1 * userRatedScore)  DESC LIMIT 3
			`;

      return session.run(query, params)
        .then(result => {
          return result.records.map(record => {
            return record.get("post").properties
          })
        })
    }
  }
}
module.exports = resolvers