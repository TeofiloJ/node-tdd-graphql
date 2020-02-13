const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

import { fakeDatabase } from '../fake.database'


// const AuthorType =  new GraphQLObjectType({
//   name: 'Author',
//   fields: ()=> ( {
//     id: {
//         type: GraphQLString
//     },
//     name: {
//       type: GraphQLString
//     },
//     email: {
//       type: GraphQLString
//     },
//     posts: {
//       type: new GraphQLList(PostType),
//       resolve: (source, params) => {
//           console.log(source.id)
//           return fakeDatabase.getPostsOfAuthor(source.id)
//       }
//     }
//   })
// })

// const PostType =  new GraphQLObjectType({
//   name: 'Post',
//   fields: () => ({
//     id: {
//         type: GraphQLInt
//     },
//     title: {
//       type: GraphQLString
//     },
//     content: {
//       type: GraphQLString
//     },
//     author: {
//       type: AuthorType,
//       resolve: (source, params) => {
//           console.log(source.author)
//             return fakeDatabase.getAuthor(source.author)
//       }
//     }
//   })
// })

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

