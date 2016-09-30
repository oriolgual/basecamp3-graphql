'use strict';

const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const QueryType = require('./types/query.js');

module.exports = new GraphQLSchema({
  query: QueryType,
});
