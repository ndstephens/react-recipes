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
