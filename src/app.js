import {schema} from './schema';
import express from 'express';
import cors from "cors";
import graphqlHTTP from "express-graphql";

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

export default app