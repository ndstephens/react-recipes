const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  #//? -------   QUERIES   --------
  type Query {
    recipes: [Recipe!]!
    users: [User!]!
  }

  #//? -------   MUTATIONS   --------
  type Mutation {
    addRecipe(data: AddRecipeInput!): Recipe!
  }

  #//? -------   CUSTOM OBJECT TYPES   --------
  type Recipe {
    _id: ID!
    name: String!
    description: String!
    category: String!
    instructions: String!
    createdAt: String!
    likes: Int!
    username: String
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
  }

  #//? -------   INPUT TYPES   --------
  input AddRecipeInput {
    name: String!
    description: String!
    category: String!
    instructions: String!
    username: String
  }
`
