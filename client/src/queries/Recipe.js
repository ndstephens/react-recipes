import { gql } from 'apollo-boost'

export const GET_ALL_RECIPES = gql`
  query GET_ALL_RECIPES {
    recipes {
      _id
      name
      category
    }
  }
`

export const GET_RECIPE = gql`
  query GET_RECIPE($_id: ID!) {
    recipe(_id: $_id) {
      _id
      name
      description
      category
      instructions
      createdAt
      likes
    }
  }
`
