import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
  <nav>
    <NavbarUnAuth />
  </nav>
)

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink exact to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Sign in</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Sign up</NavLink>
    </li>
  </ul>
)

export default Navbar
