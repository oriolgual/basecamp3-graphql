'use strict';

const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;

const Resolver = require('./resolver.js');
const resolver = new Resolver();

const QueryType = require('./types/query.js');

module.exports = new GraphQLSchema({
  query: QueryType,
});
