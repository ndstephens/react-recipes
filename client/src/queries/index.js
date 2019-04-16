import { gql } from 'apollo-boost'

export const GET_ALL_RECIPES = gql`
  query {
    recipes {
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
