const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

import { fakeDatabase } from '../fake.database'

import {AuthorType} from "./author";
import {PostType} from "./post";

const queryType =  new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (source, {id}) => {
         var res = fakeDatabase.getBlogPost(id)
         return res;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return fakeDatabase.getBlogPosts()
      }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve: () => {
          return fakeDatabase.getAuthors()
        }
    },
    author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (source, {id}) => {
          return fakeDatabase.getAuthor(id)
        }
    },
  }
})

export const schema = new GraphQLSchema({
  query: queryType
})

