const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  #//? -------   QUERIES   --------
  type Query {
    recipes: [Recipe!]!
    recipe(_id: ID!): Recipe!
    searchRecipes(searchTerm: String): [Recipe!]!

    currentUser: User
    getUserRecipes(username: String!): [Recipe!]!
  }

  #//? -------   MUTATIONS   --------
  type Mutation {
    addRecipe(data: AddRecipeInput!): Recipe!
    likeRecipe(_id: ID!, username: String!): Recipe!
    deleteUserRecipe(_id: ID!): Recipe
    signUpUser(username: String!, email: String!, password: String!): Token!
    signInUser(username: String!, password: String!): Token!
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
    # password: String!
    email: String!
    createdAt: String!
    favorites: [Recipe]
  }

  type Token {
    token: String!
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
