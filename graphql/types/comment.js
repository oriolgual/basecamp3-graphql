'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;

const PersonType = require('./person.js');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: '',
  fields: () => ({
    id: {type: GraphQLString},
    status: {type: GraphQLString},
    createdAt: {
      type: GraphQLString,
      resolve: comment => comment.created_at
    },
    updatedAt: {
      type: GraphQLString,
      resolve: comment => comment.updated_at
    },
    type: {type: GraphQLString},
    url: {type: GraphQLString},
    appUrl: {
      type: GraphQLString,
      resolve: comment => comment.app_url
    },
    creator: {
      type: PersonType,
      resolve: comment => comment.creator
    },
    content: {type: GraphQLString}
  }),
});

module.exports = CommentType;
