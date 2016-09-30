const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;

const MessageType = require('./message.js');
const TodolistType = require('./todolist.js');

const BasecampType = new GraphQLObjectType({
  name: 'Basecamp',
  description: 'Basecamps are how you organize everything.',
  fields: () => ({
    id: {type: GraphQLString},
    status: {type: GraphQLBoolean},
    bookmarked: {type: GraphQLBoolean},
    createdAt: {
      type: GraphQLString,
      resolve: basecamp => basecamp.created_at
    },
    updatedAt: {
      type: GraphQLString,
      resolve: basecamp => basecamp.updated_at
    },
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    bookmarkUrl: {
      type: GraphQLString,
      resolve: basecamp => basecamp.bookmark_url
    },
    url: {type: GraphQLString},
    appUrl: {
      type: GraphQLString,
      resolve: basecamp => basecamp.app_url
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parentValue, _args, _info, ast) {
        return ast.rootValue.resolver.messages(parentValue);
      }
    },
    todolists: {
      type: new GraphQLList(TodolistType),
      resolve(parentValue, _args, _info, ast) {
        return ast.rootValue.resolver.todolists(parentValue);
      }
    }
  }),
});

module.exports = BasecampType;
