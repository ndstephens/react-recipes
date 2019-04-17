import { gql } from 'apollo-boost'

export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      username
      email
      createdAt
    }
  }
`
