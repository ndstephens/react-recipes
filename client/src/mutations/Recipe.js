import { gql } from 'apollo-boost'

import { recipeFragments } from '../fragments/fragments'

export const ADD_RECIPE = gql`
  mutation ADD_RECIPE(
    $name: String!
    $imageUrl: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String!
  ) {
    addRecipe(
      data: {
        name: $name
        imageUrl: $imageUrl
        description: $description
        category: $category
        instructions: $instructions
        username: $username
      }
    ) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`

export const LIKE_RECIPE = gql`
  mutation LIKE_RECIPE($_id: ID!, $username: String!, $liked: Boolean!) {
    likeRecipe(_id: $_id, username: $username, liked: $liked) {
      _id
      likes
    }
  }
`

export const UPDATE_USER_RECIPE = gql`
  mutation UPDATE_USER_RECIPE(
    $_id: ID!
    $name: String!
    $imageUrl: String!
    $description: String!
    $category: String!
  ) {
    updateUserRecipe(
      _id: $_id
      data: {
        name: $name
        imageUrl: $imageUrl
        description: $description
        category: $category
      }
    ) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`

export const DELETE_USER_RECIPE = gql`
  mutation DELETE_USER_RECIPE($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`
