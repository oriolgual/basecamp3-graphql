'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const Resolver = require('../resolver.js');
const resolver = new Resolver();

const PersonType = require('./person.js');
const BasecampType = require('./basecamp.js');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => resolver.people(),
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => resolver.person(args.id),
    },
    basecamps: {
      type: new GraphQLList(BasecampType),
      resolve: () => resolver.basecamps(),
    },
    basecamp: {
      type: BasecampType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => resolver.basecamp(args.id),
    },
  }),
});

module.exports = QueryType;
