'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const PersonType = require('./person.js');

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
    // basecamp: {
    //   type: BasecampType,
    //   resolve: basecamp => new BasecampType(basecamp.bucket)
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
    subject: {type: GraphQLString}
  }),
});

module.exports = MessageType;
