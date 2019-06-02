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

import 'materialize-css/dist/css/materialize.min.css'
import './index.css'

import App from './components/App'
import Navbar from './components/Navbar'
import Search from './components/Recipe/Search'
import withSession from './components/withSession'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import AddRecipe from './components/Recipe/AddRecipe'
import RecipePage from './components/Recipe/RecipePage'
import Profile from './components/Profile/Profile'

const client = new ApolloClient({
  uri: '/graphql',
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
      localStorage.setItem('token', '')
    }
  },
})

const Root = ({ refetch, session }) => (
  <Router>
    <>
      <Navbar session={session} />
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
        <Route
          path="/recipe/add"
          render={props => <AddRecipe session={session} {...props} />}
        />
        <Route path="/recipe/:_id" component={RecipePage} />
        <Route
          path="/profile"
          render={props => <Profile session={session} {...props} />}
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
