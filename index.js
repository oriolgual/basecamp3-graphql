require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const session = require('express-session');
const BasecampAuth = require('./lib/basecamp-auth.js');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const basecampAuth = new BasecampAuth(client_id, client_secret);

// Construct a schema, using GraphQL schema language
const schema = require('./graphql/schema.js');

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(session({ secret: 'basecamp', cookie: { maxAge: 60000 }}));

app.get('/', function (req, res) {
  res.send('<a href="' + basecampAuth.authorizationUri() + '">Authenticate with Basecamp 3</a>');
});

app.get('/auth', function (req, res) {
  const authCode = req.query.code;
  const session = req.session;
  basecampAuth.createToken(authCode).then(token => {
    req.session.authToken = token.refresh_token;
    res.redirect('/graphql');
  });
});

app.use('/graphql', graphqlHTTP((request) => ({
  schema: schema,
  rootValue: { session: request.session },
  graphiql: true,
})));

app.listen(app.get('port'), function() {
  console.log('Running a GraphQL API server on port', app.get('port'));
});
