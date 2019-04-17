import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import Error from '../Error'
import { SIGNIN_USER } from '../../mutations/User'

const initialState = {
  username: '',
  password: '',
}

class SignIn extends Component {
  state = { ...initialState }

  clearState = () => {
    this.setState({ ...initialState })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (e, signInUser) => {
    e.preventDefault()
    signInUser().then(({ data }) => {
      localStorage.setItem('token', data.signInUser.token)
      this.clearState()
    })
  }

  formInvalid = () => {
    const { username, password } = this.state
    const isInvalid = !username.trim() || !password.trim()

    return isInvalid
  }

  render() {
    const { username, password } = this.state

    return (
      <div className="App">
        <h2 className="App">SignIn</h2>

        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signInUser, { loading, error, data }) => {
            return (
              <form
                className="form"
                onSubmit={e => this.handleFormSubmit(e, signInUser)}
              >
                <input
                  autoFocus
                  value={username}
                  onChange={this.handleInputChange}
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <input
                  value={password}
                  onChange={this.handleInputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />

                <button
                  disabled={loading || this.formInvalid()}
                  type="submit"
                  className="button-primary"
                >
                  Submit
                </button>

                {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default SignIn
