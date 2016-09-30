'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const PersonType = require('./person.js');
const BasecampType = require('./basecamp.js');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    people: {
      type: new GraphQLList(PersonType),
      resolve(_parentValue, _args, context, _ast) {
        return context.resolver.people()
      }
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(_parentValue, args, context, _ast) {
        return context.resolver.person(args.id)
      }
    },
    basecamps: {
      type: new GraphQLList(BasecampType),
      resolve(_parentValue, _args, context, _ast) {
        return context.resolver.basecamps()
      }
    },
    basecamp: {
      type: BasecampType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(_parentValue, args, context, _ast) {
        return context.resolver.basecamp(args.id)
      }
    },
  }),
});

module.exports = QueryType;
