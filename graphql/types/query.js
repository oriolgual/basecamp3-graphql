'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const PersonType = require('./person.js');
const BasecampType = require('./basecamp.js');
const AccountType = require('./account.js');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    accounts: {
      type: new GraphQLList(AccountType),
      resolve(_parentValue, _args, context, _ast) {
        return context.resolver.accounts();
      }
    },
    people: {
      type: new GraphQLList(PersonType),
      args: {
        accountId: {type: GraphQLString}
      },
      resolve(_parentValue, args, context, _ast) {
        return context.resolver.people(args.accountId);
      }
    },
    person: {
      type: PersonType,
      args: {
        accountId: {type: GraphQLString},
        id: { type: GraphQLString }
      },
      resolve(_parentValue, args, context, _ast) {
        return context.resolver.person(args.accountId, args.id);
      }
    },
    basecamps: {
      type: new GraphQLList(BasecampType),
      args: {
        accountId: {type: GraphQLString}
      },
      resolve(_parentValue, args, context, _ast) {
        return context.resolver.basecamps(args.accountId);
      }
    },
    basecamp: {
      type: BasecampType,
      args: {
        accountId: {type: GraphQLString},
        id: {type: GraphQLString}
      },
      resolve(_parentValue, args, context, _ast) {
        return context.resolver.basecamp(args.accountId, args.id);
      }
    }
  })
});

module.exports = QueryType;
