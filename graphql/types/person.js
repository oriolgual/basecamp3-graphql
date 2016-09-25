'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    id: {type: GraphQLString},
    attachableSgid: {
      type: GraphQLString,
      resolve: person => person.attachable_sgid,
    },
    name: {type: GraphQLString},
    emailAddress: {
      type: GraphQLString,
      resolve: person => person.email_address,
    },
    personableType: {
      type: GraphQLString,
      resolve: person => person.personable_type,
    },
    title: {type: GraphQLString},
    bio: {type: GraphQLString},
    createdAt: {
      type: GraphQLString,
      resolve: person => person.created_at,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: person => person.updated_at,
    },
    admin: {type: GraphQLBoolean},
    owner: {type: GraphQLBoolean},
    timeZone: {
      type: GraphQLString,
      resolve: person => person.time_zone,
    },
    avatarUrl: {
      type: GraphQLString,
      resolve: person => person.avatar_url,
    }
  }),
});

module.exports = PersonType;
