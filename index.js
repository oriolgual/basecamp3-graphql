require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const session = require('express-session');
const BasecampAuth = require('./lib/basecamp-auth.js');
const BasecampClient = require('./lib/basecamp-client.js');
const Schema = require('./graphql/schema.js');
const Resolver = require('./graphql/resolver.js');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const basecampAuth = new BasecampAuth(client_id, client_secret);

// Construct a schema, using GraphQL schema language

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(session({
  secret: 'basecamp',
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
}));

app.get('/', function (req, res) {
  res.send('<a href="' + basecampAuth.authorizationUri() + '">Authenticate with Basecamp 3</a>');
});

app.get('/auth', function (request, response) {
  const authCode = request.query.code;
  const session = request.session;
  basecampAuth.createToken(authCode).then(token => {
    request.session.oAuth = token;
    response.redirect('/graphql');
  });
});

app.use('/graphql', graphqlHTTP((request) => ({
  schema: Schema,
  rootValue: {},
  context: {
    resolver: new Resolver(new BasecampClient(basecampAuth, request.session.oAuth, 'Basecamp 3 GraphQL wrapper (oriol@codegram.com)'))
  },
  graphiql: true,
})));

app.listen(app.get('port'), function() {
  console.log('Running a GraphQL API server on port', app.get('port'));
});
