import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css'

import App from './components/App'
import Navbar from './components/Navbar'
import Search from './components/Recipe/Search'
import withSession from './components/withSession'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'

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

const Root = ({ refetch }) => (
  <Router>
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route
          path="/signin"
          render={props => <SignIn refetch={refetch} {...props} />}
        />
        <Route
          path="/signup"
          render={props => <SignUp refetch={refetch} {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </>
  </Router>
)

const RootWithSession = withSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
)
