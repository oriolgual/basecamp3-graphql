'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const BasecampType = require('./basecamp.js');

const AccountType = new GraphQLObjectType({
  name: 'Account',
  description: 'A Basecamp account',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    product: {type: GraphQLString},
    href: {type: GraphQLString},
    appHref: {
      type: GraphQLString,
      resolve: account => account.app_href
    },
    basecamps: {
      type: new GraphQLList(BasecampType),
      resolve(parentValue, _args, context, _ast) {
        return context.resolver.basecamps(parentValue.id);
      }
    }
  }),
});

module.exports = AccountType;
