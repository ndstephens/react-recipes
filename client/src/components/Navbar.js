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
      <nav className="nav-wrapper">
        <div className="container">
          <NavLink exact to="/" className="brand-logo">
            React Recipes
          </NavLink>

          {/* HAMBURGER MENU ICON ON MOBILE SCREENS */}
          <a href="#!" className="sidenav-trigger" data-target="mobile-nav">
            <i className="material-icons">menu</i>
          </a>

          {/* NAVIGATION FOR LARGER SCREENS */}
          {session && session.currentUser ? (
            <>
              <ul className="right hide-on-med-and-down">
                <NavbarAuth session={session} />
              </ul>
              {/* <h4>
                Welcome, <strong>{session.currentUser.username}</strong>
              </h4> */}
            </>
          ) : (
            <ul className="right hide-on-med-and-down">
              <NavbarUnAuth />
            </ul>
          )}
        </div>
      </nav>

      {/* MOBILE SCREEN SLIDE-OUT NAVIGATION */}
      {session && session.currentUser ? (
        <>
          <ul className="sidenav" ref={refSideNav} id="mobile-nav">
            <NavbarAuth session={session} closeNav={handleCloseNav} />
          </ul>
        </>
      ) : (
        <ul className="sidenav" ref={refSideNav} id="mobile-nav">
          <NavbarUnAuth closeNav={handleCloseNav} />
        </ul>
      )}
    </>
  )
}

const NavbarAuth = ({ session, closeNav }) => (
  <>
    <li onClick={closeNav}>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/recipe/add">Add Recipe</NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/profile">Profile</NavLink>
    </li>
    <li onClick={closeNav}>
      <SignOut />
    </li>
  </>
)

const NavbarUnAuth = ({ closeNav }) => (
  <>
    <li onClick={closeNav}>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/signin">Sign in</NavLink>
    </li>
    <li onClick={closeNav}>
      <NavLink to="/signup">Sign up</NavLink>
    </li>
  </>
)

export default Navbar
