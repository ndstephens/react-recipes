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
        <a
          className="nav-link"
          href="#!"
          onClick={() => handleSignOut(client, history)}
        >
          <i className="material-icons">cancel</i>Sign Out
        </a>
      )
    }}
  </ApolloConsumer>
)

export default withRouter(SignOut)
