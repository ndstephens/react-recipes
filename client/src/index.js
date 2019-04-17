import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './index.css'
import App from './components/App'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error:', networkError)
    }
  },
})

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Redirect to="/" />
    </Switch>
  </Router>
)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
)
