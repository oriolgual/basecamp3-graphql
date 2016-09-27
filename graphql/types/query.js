'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const Resolver = require('../resolver.js');

const PersonType = require('./person.js');
const BasecampType = require('./basecamp.js');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    people: {
      type: new GraphQLList(PersonType),
      resolve(parentValue, _, rootValue) {
        return new Resolver(rootValue.session.authToken).people()
      }
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args, rootValue) {
        return new Resolver(rootValue.session.authToken).person(args.id)
      }
    },
    basecamps: {
      type: new GraphQLList(BasecampType),
      resolve(parentValue, _, rootValue) {
        return new Resolver(rootValue.session.authToken).basecamps()
      }
    },
    basecamp: {
      type: BasecampType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args, rootValue) {
        return new Resolver(rootValue.session.authToken).basecamp(args.id)
      }
    },
  }),
});


module.exports = QueryType;
