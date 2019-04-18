import { gql } from 'apollo-boost'

export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      username
      email
      createdAt
      favorites {
        _id
        name
      }
    }
  }
`

export const GET_USER_RECIPES = gql`
  query GET_USER_RECIPES($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes
    }
  }
`
