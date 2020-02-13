import express from 'express';
import cors from "cors";

import graphqlHTTP from "express-graphql";
import buildSchema from 'graphql';

var schema = buildSchema(`
    type Query {
        name:String
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

export default app