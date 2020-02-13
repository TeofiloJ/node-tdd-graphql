var app = require('./app')

// App Listening

app.listen(3000, function() {
  console.log('Running a GraphQL API server at http://localhost:3000/graphql');
});