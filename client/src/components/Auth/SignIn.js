import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import Error from '../Error'
import { SIGNIN_USER } from '../../mutations/User'

class SignIn extends Component {
  state = { username: '', password: '' }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (e, signInUser) => {
    e.preventDefault()
    signInUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signInUser.token)
      await this.props.refetch()
      this.props.history.push('/')
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
      <div className="SignIn">
        <h2 className="orange-text text-accent-2">Sign In</h2>

        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signInUser, { loading, error, data }) => {
            return (
              <form onSubmit={e => this.handleFormSubmit(e, signInUser)}>
                {/* USERNAME */}
                <div className="input-field">
                  <i class="material-icons prefix">account_circle</i>
                  <input
                    autoFocus
                    autoComplete="username"
                    value={username}
                    onChange={this.handleInputChange}
                    type="text"
                    name="username"
                    id="username"
                  />
                  <label htmlFor="username">Username</label>
                </div>

                {/* PASSWORD */}
                <div className="input-field">
                  <i class="material-icons prefix">security</i>
                  <input
                    autoComplete="password"
                    value={password}
                    onChange={this.handleInputChange}
                    type="password"
                    name="password"
                    id="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  disabled={loading || this.formInvalid()}
                  type="submit"
                  className="btn waves-effect waves-light green lighten-2 z-depth-0"
                >
                  Submit
                  <i class="material-icons right">check_circle</i>
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
