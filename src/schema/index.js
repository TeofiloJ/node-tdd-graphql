const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql

function getAuthor(authorId){
    return authors.filter((author) => {
        return author.id === authorId;
    })[0];
}

function getPost(id) {
    return posts.filter((post) => {
        return post.id === id;
    })[0];
}

const authors = [
    { id: '88d6bec2', name: 'Xavier Decuyper', email: 'xavier@awesomeblog.com' },
    { id: '77e2448a', name: 'Jessie Baker', email: 'jessie@awesomeblog.com' },
    { id: '0beb564c', name: 'Adam Richards', email: 'adam@awesomeblog.com' }
];

const posts = [
    {
        id: 1,
        title: 'My first blog post',
        content: 'This is my very first blog post. Hope you like it!',
        author: '88d6bec2',
    },
    {
        id: 2,
        title: 'Second blog post',
        content: 'Back for another round!',
        author: '0beb564c',
    },
    {
        id: 3,
        title: 'Building a REST API',
        content: 'A pratical guide on how to build your own REST API.',
        author: '77e2448a',
    }
];

const comments = [
    { id: 1, postId: 1, name: 'Anonymous', content: 'Good luck with your blog!' },
    { id: 2, postId: 1, name: 'Nick', content: 'Great first article. Do you have an RSS feed?' },
    { id: 3, postId: 3, name: 'Peter', content: 'You should check out GraphQL. It\'s way better and Savjee has a great tutorial on it!' },
]

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
        return getAuthor(source.author)
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
        return getPost(id)
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts
      }
    },
    authors: {
        type: new GraphQLList(authorType),
        resolve: () => {
          return authors
        }
    },
    author: {
        type: authorType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (source, {id}) => {
          return getAuthor(id)
        }
      },
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema