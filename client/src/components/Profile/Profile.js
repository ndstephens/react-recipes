import React from 'react'
import UserInfo from './UserInfo'
import UserRecipes from './UserRecipes'

const Profile = ({ session }) => {
  return (
    <div className="App">
      <UserInfo session={session} />
      <UserRecipes username={session.currentUser.username} />
    </div>
  )
}

export default Profile
