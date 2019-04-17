import { gql } from 'apollo-boost'

export const SIGNUP_USER = gql`
  mutation SIGNUP_USER(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`

export const SIGNIN_USER = gql`
  mutation SIGNIN_USER($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`
