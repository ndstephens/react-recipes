import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import Error from '../Error'
import { SIGNUP_USER } from '../../mutations/User'

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (e, signUpUser) => {
    e.preventDefault()
    signUpUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signUpUser.token)
      await this.props.refetch()
      this.props.history.push('/')
    })
  }

  formInvalid = () => {
    const { username, email, password, passwordConfirmation } = this.state
    const isInvalid =
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      password.trim() !== passwordConfirmation.trim()

    return isInvalid
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state

    return (
      <div className="App">
        <h2 className="App">SignUp</h2>

        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signUpUser, { loading, error, data }) => {
            return (
              <form
                className="form"
                onSubmit={e => this.handleFormSubmit(e, signUpUser)}
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
                  value={email}
                  onChange={this.handleInputChange}
                  type="email"
                  name="email"
                  placeholder="Email address"
                />
                <input
                  value={password}
                  onChange={this.handleInputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <input
                  value={passwordConfirmation}
                  onChange={this.handleInputChange}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
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

export default SignUp
