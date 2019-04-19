import { gql } from 'apollo-boost'

export const ADD_RECIPE = gql`
  mutation ADD_RECIPE(
    $name: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String!
  ) {
    addRecipe(
      data: {
        name: $name
        description: $description
        category: $category
        instructions: $instructions
        username: $username
      }
    ) {
      _id
      name
      description
      category
      instructions
      username
      likes
      createdAt
    }
  }
`

export const LIKE_RECIPE = gql`
  mutation LIKE_RECIPE($_id: ID!, $username: String!, $liked: Boolean!) {
    likeRecipe(_id: $_id, username: $username, liked: $liked) {
      _id
      likes
    }
  }
`

export const DELETE_USER_RECIPE = gql`
  mutation DELETE_USER_RECIPE($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`
