'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const PersonType = require('./person.js');
const BasecampType = require('./basecamp.js');
const CommentType = require('./comment.js');

const MessageType = new GraphQLObjectType({
  name: 'Message',
  description: 'Announcements sent to a Basecamp',
  fields: () => ({
    id: {type: GraphQLString},
    status: {type: GraphQLString},
    createdAt: {
      type: GraphQLString,
      resolve: message => message.created_at
    },
    updatedAt: {
      type: GraphQLString,
      resolve: message => message.updated_at
    },
    type: {type: GraphQLString},
    url: {type: GraphQLString},
    appUrl: {
      type: GraphQLString,
      resolve: message => message.app_url
    },
    commentsCount: {
      type: GraphQLString,
      resolve: message => message.comments_count
    },
    commentsUrl: {
      type: GraphQLString,
      resolve: message => message.comments_url
    },
    // TODO: Use ES6 since module.exports is being overwrittn, see:
    // http://stackoverflow.com/questions/38172982/getting-field-type-error-on-complex-object-in-graphql
    //
    // basecamp: {
    //   type: BasecampType,
    //   resolve: message => message.bucket
    // },
    creator: {
      type: PersonType,
      resolve: message => message.creator
    },
    content: {type: GraphQLString},
    bookmarkUrl: {
      type: GraphQLString,
      resolve: message => message.bookmark_url
    },
    subscriptionUrl: {
      type: GraphQLString,
      resolve: message => message.subscription_url
    },
    subject: {type: GraphQLString},
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, _args, context, _ast) {
        return context.resolver.comments(parentValue.url, parentValue.bucket, parentValue);
      }
    }
  }),
});

module.exports = MessageType;
