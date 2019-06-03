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
      <div className="SignUp">
        <h2 className="orange-text text-accent-2">Sign Up</h2>

        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signUpUser, { loading, error, data }) => {
            return (
              <form onSubmit={e => this.handleFormSubmit(e, signUpUser)}>
                {/* USERNAME */}
                <div className="input-field">
                  <i class="material-icons prefix">account_circle</i>
                  <input
                    autoFocus
                    value={username}
                    onChange={this.handleInputChange}
                    type="text"
                    name="username"
                    id="username"
                  />
                  <label htmlFor="username">Username</label>
                </div>

                {/* EMAIL */}
                <div className="input-field">
                  <i class="material-icons prefix">email</i>
                  <input
                    value={email}
                    onChange={this.handleInputChange}
                    type="email"
                    name="email"
                    id="email"
                  />
                  <label htmlFor="email">Email</label>
                </div>

                {/* PASSWORD */}
                <div className="input-field">
                  <i class="material-icons prefix">security</i>
                  <input
                    value={password}
                    onChange={this.handleInputChange}
                    type="password"
                    name="password"
                    id="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="input-field">
                  <i class="material-icons prefix" />
                  <input
                    value={passwordConfirmation}
                    onChange={this.handleInputChange}
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                  />
                  <label htmlFor="passwordConfirmation">Confirm Password</label>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  disabled={loading || this.formInvalid()}
                  type="submit"
                  className="btn waves-effect waves-light green lighten-2 z-depth-0"
                >
                  <i class="material-icons right">cloud_upload</i>
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
