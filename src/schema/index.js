const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

import { fakeDatabase } from '../fake.database'

const authorType =  new GraphQLObjectType({
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
    }
  }
})

const postType =  new GraphQLObjectType({
  name: 'Post',
  fields: {
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
      type: authorType,
      resolve: (source, params) => {
          console.log(source.author)
            return fakeDatabase.getAuthor(source.author)
      }
    }
  }
})

const queryType =  new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (source, {id}) => {
        return fakeDatabase.getPost(id)
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return fakeDatabase.getBlogPosts()
      }
    },
    authors: {
        type: new GraphQLList(authorType),
        resolve: () => {
          return fakeDatabase.getAuthors()
        }
    },
    author: {
        type: authorType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (source, {id}) => {
          return fakeDatabase.getAuthor(id)
        }
      },
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema