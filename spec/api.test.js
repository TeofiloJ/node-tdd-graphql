import app  from '../src/app.js'
import request from 'supertest'

// AUTHORS

describe('GET /', () => {
  let response
  test('get all authors', async () =>{
    const query_string = `{
      authors {
        name  
      } 
    } `
    response  = await  request(app)
    .post('/graphql').send({ query:  query_string})
    console.log(response.body)
    expect(response.body.data.authors[0].name).toBe("Xavier Decuyper")
    })
});



describe('GET /', () => {
  let response
  test('get a specific author', async () =>{
    const query_string = `{ 
      author(id: "88d6bec2") {       
        name    
      }       
    }`
    response  = await  request(app)
    .post('/graphql').send({ query:  query_string})
    console.log(response.body)
    expect(response.body.data.author.name).toBe("Xavier Decuyper")
    })
});


describe('GET /', () => {
  let response
  test('get a specific author with posts', async () =>{
    const query_string = `{ 
      author(id: "88d6bec2") {       
        name       
        posts {       
          id        
          title       
          content       
        }       
      }       
    }`
    response  = await  request(app)
    .post('/graphql').send({ query:  query_string})
    console.log(response.data)
    expect(response.body.data.author.name).toBe("Xavier Decuyper")
    })
});

// POSTS

describe('GET /', () => {
  let response
  test('get a post with author', async () =>{
    const query_string = `{
      posts{
      title,
      author {
          name  
      }
    }
    }`
    response  = await  request(app)
      .post('/graphql').send({ query:  query_string})
    expect(response.body.data.posts[0].title).toBe("My first blog post")
    })
});


