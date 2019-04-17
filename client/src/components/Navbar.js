import React from 'react'
import { NavLink } from 'react-router-dom'

import SignOut from './Auth/SignOut'

const Navbar = ({ session }) => (
  <nav>
    {session && session.currentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
)

const NavbarAuth = ({ session }) => (
  <>
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
        <NavLink to="/recipe/add">Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
    <h4>
      Welcome, <strong>{session.currentUser.username}</strong>
    </h4>
  </>
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
