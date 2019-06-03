import React, { useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Sidenav } from 'materialize-css'

import SignOut from './Auth/SignOut'

const Navbar = ({ session }) => {
  let sideNavInstance = null

  const refSideNav = useRef(null)

  useEffect(() => {
    sideNavInstance = Sidenav.init(refSideNav.current, {
      preventScrolling: false,
    })
  }, [session])

  const handleCloseNav = () => {
    if (sideNavInstance.isOpen) {
      sideNavInstance.close()
    }
  }

  return (
    <>
      <nav className="nav-wrapper green lighten-3 z-depth-1">
        <div className="container">
          {/* BRAND LOGO - NAME */}
          <NavLink exact to="/" className="brand-logo">
            React Recipes
          </NavLink>

          {/* HAMBURGER MENU ICON ON MOBILE SCREENS */}
          <a href="#!" className="sidenav-trigger" data-target="mobile-nav">
            <i className="material-icons">menu</i>
          </a>

          {/* NAVIGATION -- LARGER SCREENS */}
          {session && session.currentUser ? (
            <>
              <ul className="right hide-on-med-and-down">
                <NavbarAuth session={session} />
              </ul>
            </>
          ) : (
            <ul className="right hide-on-med-and-down">
              <NavbarUnAuth />
            </ul>
          )}
        </div>
      </nav>

      {/* NAVIGATION -- MOBILE SCREEN SLIDE-OUT */}
      {session && session.currentUser ? (
        <>
          <ul
            className="sidenav light-green lighten-5"
            ref={refSideNav}
            id="mobile-nav"
          >
            <NavbarAuth session={session} closeNav={handleCloseNav} />
          </ul>
        </>
      ) : (
        <ul
          className="sidenav light-green lighten-5"
          ref={refSideNav}
          id="mobile-nav"
        >
          <NavbarUnAuth closeNav={handleCloseNav} />
        </ul>
      )}
    </>
  )
}

const NavbarAuth = ({ session, closeNav }) => (
  <>
    <li onClick={closeNav}>
      <NavLink to="/search" className="nav-link">
        <i className="material-icons">search</i>Search
      </NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/recipe/add" className="nav-link">
        <i className="material-icons">add_circle</i>Add Recipe
      </NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/profile" className="nav-link">
        <i className="material-icons">account_circle</i>Profile
      </NavLink>
    </li>
    <li onClick={closeNav}>
      <SignOut />
    </li>
  </>
)

const NavbarUnAuth = ({ closeNav }) => (
  <>
    <li onClick={closeNav}>
      <NavLink to="/search" className="nav-link">
        <i className="material-icons">search</i>Search
      </NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/signin" className="nav-link">
        <i className="material-icons">check_circle</i>Sign In
      </NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/signup" className="nav-link">
        <i className="material-icons">cloud_upload</i>Sign Up
      </NavLink>
    </li>
  </>
)

export default Navbar
