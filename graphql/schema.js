'use strict';

const graphql = require('graphql');
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;

const Resolver = require('./resolver.js');
const resolver = new Resolver();

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
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => resolver.people(),
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => resolver.person(args.id),
    },
    basecamps: {
      type: new GraphQLList(BasecampType),
      resolve: () => resolver.basecamps(),
    },
    basecamp: {
      type: BasecampType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => resolver.basecamp(args.id),
    },
  }),
});


module.exports = new GraphQLSchema({
  query: QueryType,
});
