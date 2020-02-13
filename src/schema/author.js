const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

import { fakeDatabase } from '../fake.database'

import {PostType} from "./post";


export const AuthorType =  new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: {
        type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    // posts: {
    //     type: new GraphQLList(PostType),
    //     resolve: (source, params) => {
    //         console.log(source.id)
    //         return fakeDatabase.getPostsOfAuthor(source.id)
    //     }
    //   }
  }
})