const { ApolloServer, gql } = require('apollo-server')
const data = require('./data/1.json')

const typeDefs = gql`
  enum Gender {
    Male
    Female
    NA
    None
    Hermaphrodite
  }

  type Character {
    name: String!
    height: String!
    mass: String!
    gender: Gender!
    species: String!
  }

  type CharacterResult {
    characters: [Character]!
    totalCount: Int!
  }

  type Query {
    character: Character!
    characters(gender: Gender!): CharacterResult
  }
`

const resolvers = {
  Gender: {
    Male: 'male',
    Female: 'female',
    NA: 'NA',
    None: 'none',
    Hermaphrodite: 'hermaphrodite'
  },
  Query: {
    character() {
      return data.pop()
    },
    characters(_, { gender }) {
      return gender ? (data || []).filter(character => character.gender === gender) : data
    }
  },
  CharacterResult: {
    characters(parent) {
      return parent
    },
    totalCount(parent) {
      return parent.length
    }
  },
  Character: {
    name(parent) {
        return parent.name
    },
    height(parent) {
      return parent.height
    },
    mass(parent) {
      return parent.mass
    },
    gender(parent) {
      return parent.gender
    },
    species(parent) {
      return parent.species
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(data => console.log(`server started at port ${data.port}`))
