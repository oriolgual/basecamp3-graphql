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
      resolve(parentValue, _, rootValue) {
        return resolver.people()
      }
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args, rootValue) {
        return rootValue.resolver.person(args.id)
      }
    },
    basecamps: {
      type: new GraphQLList(BasecampType),
      resolve(parentValue, _args, _info, _ast) {
        // parentValue is the rootValue of the Schema, defined at index.js
        // args is self explanatory
        // info, seems to be express
        // ast, is the Abstract Syntax Tree of all the Graph
        return parentValue.resolver.basecamps()
      }
    },
    basecamp: {
      type: BasecampType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args, rootValue) {
        return parentValue.resolver.basecamp(args.id)
      }
    },
  }),
});


module.exports = QueryType;
