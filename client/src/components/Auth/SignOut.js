import React from 'react'
import { withRouter } from 'react-router-dom'
import { ApolloConsumer } from 'react-apollo'

const handleSignOut = (client, history) => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push('/')
}

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <a href="#!" onClick={() => handleSignOut(client, history)}>
          Sign Out
        </a>
      )
    }}
  </ApolloConsumer>
)

export default withRouter(SignOut)
