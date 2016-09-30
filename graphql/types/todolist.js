'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;

const PersonType = require('./person.js');
const BasecampType = require('./basecamp.js');

const TodolistType = new GraphQLObjectType({
  name: 'Todolist',
  description: 'Announcements sent to a Basecamp',
  fields: () => ({
    id: {type: GraphQLString},
    status: {type: GraphQLString},
    createdAt: {
      type: GraphQLString,
      resolve: todolist => todolist.created_at
    },
    updatedAt: {
      type: GraphQLString,
      resolve: todolist => todolist.updated_at
    },
    type: {type: GraphQLString},
    url: {type: GraphQLString},
    appUrl: {
      type: GraphQLString,
      resolve: todolist => todolist.app_url
    },
    commentsCount: {
      type: GraphQLString,
      resolve: todolist => todolist.comments_count
    },
    commentsUrl: {
      type: GraphQLString,
      resolve: todolist => todolist.comments_url
    },
    creator: {
      type: PersonType,
      resolve: todolist => todolist.creator
    },
    bookmarkUrl: {
      type: GraphQLString,
      resolve: todolist => todolist.bookmark_url
    },
    subscriptionUrl: {
      type: GraphQLString,
      resolve: todolist => todolist.subscription_url
    },
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    completed: {type: GraphQLBoolean},
    completed_ratio: {type: GraphQLString},
    todosUrl: {
      type: GraphQLString,
      resolve: todolist => todolist.todos_url
    },
    appTodosUrl: {
      type: GraphQLString,
      resolve: todolist => todolist.app_todos_url
    }
  }),
});

module.exports = TodolistType;
