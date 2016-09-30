'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;

const PersonType = require('./person.js');
const BasecampType = require('./basecamp.js');
const CommentType = require('./comment.js');

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  description: '',
  fields: () => ({
    id: {type: GraphQLString},
    status: {type: GraphQLString},
    createdAt: {
      type: GraphQLString,
      resolve: todo => todo.created_at
    },
    updatedAt: {
      type: GraphQLString,
      resolve: todo => todo.updated_at
    },
    type: {type: GraphQLString},
    url: {type: GraphQLString},
    appUrl: {
      type: GraphQLString,
      resolve: todo => todo.app_url
    },
    commentsCount: {
      type: GraphQLString,
      resolve: todo => todo.comments_count
    },
    commentsUrl: {
      type: GraphQLString,
      resolve: todo => todo.comments_url
    },
    creator: {
      type: PersonType,
      resolve: todo => todo.creator
    },
    bookmarkUrl: {
      type: GraphQLString,
      resolve: todo => todo.bookmark_url
    },
    subscriptionUrl: {
      type: GraphQLString,
      resolve: todo => todo.subscription_url
    },
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
    content: {type: GraphQLString},
    startsOn: {
      type: GraphQLString,
      resolve: todo => todo.starts_on
    },
    dueOn: {
      type: GraphQLString,
      resolve: todo => todo.due_on
    },
    completionUrl: {
      type: GraphQLString,
      resolve: todo => todo.completion_url
    },
    assignees: {
      type: new GraphQLList(PersonType),
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, _args, context, _ast) {
        return context.resolver.comments(parentValue.bucket, parentValue);
      }
    }
  }),
});

module.exports = TodoType;
