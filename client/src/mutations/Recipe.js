import { gql } from 'apollo-boost'

import { recipeFragments } from '../fragments/fragments'

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

export const DELETE_USER_RECIPE = gql`
  mutation DELETE_USER_RECIPE($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`
