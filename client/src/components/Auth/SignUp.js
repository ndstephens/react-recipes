import React, { Component } from 'react'

class SignUp extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="App">SignUp</h2>
        <form className="form">
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email address" />
          <input type="password" name="password" placeholder="Password" />
          <input
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
