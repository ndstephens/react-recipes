import React, { Component } from 'react'

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

  render() {
    const { username, email, password, passwordConfirmation } = this.state

    return (
      <div className="App">
        <h2 className="App">SignUp</h2>
        <form className="form">
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

          <button type="submit" className="button-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default SignUp
