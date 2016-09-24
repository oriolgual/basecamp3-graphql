var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');


// Construct a schema, using GraphQL schema language
var schema = require('./schema.js');

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(app.get('port'), function() {
  console.log('Running a GraphQL API server on port', app.get('port'));
});
