const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql


import { fakeDatabase } from '../fake.database'

import {AuthorType} from "./author";

export const PostType =  new GraphQLObjectType({
  name: 'Post',
  fields: () =>( {
    id: {
        type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve: (source, params) => {
        return fakeDatabase.getAuthor(source.author)
      }
    }
  })
})

