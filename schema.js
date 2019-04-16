const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  type Query {
    recipes: [Recipe!]!
    users: [User!]!
  }

  type Recipe {
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdAt: String
    likes: Int
    username: String
  }

  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }
`
