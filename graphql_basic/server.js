const { ApolloServer, gql } = require('apollo-server')
// const data = require('./data/')

const typeDefs = gql`
  # definitions
`

const resolvers = {
  // resolvers
}


const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(data => console.log(`server started at port ${data.port}`))
