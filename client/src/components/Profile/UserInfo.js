import React from 'react'
import { Link } from 'react-router-dom'

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US')
  const newTime = new Date(date).toLocaleTimeString('en-US')

  return `${newDate} at ${newTime}`
}

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {session.currentUser.username}</p>
    <p>Email: {session.currentUser.email}</p>
    <p>Join Date: {formatDate(parseInt(session.currentUser.createdAt))}</p>
    <ul>
      <h3>{session.currentUser.username}'s Favorites</h3>
      {session.currentUser.favorites.map(favorite => (
        <li key={favorite._id}>
          <Link to={`/recipe/${favorite._id}`}>
            <p>{favorite.name}</p>
          </Link>
        </li>
      ))}
      {!session.currentUser.favorites.length && (
        <p>
          <strong>You have no favorites currently. Go add some!</strong>
        </p>
      )}
    </ul>
  </div>
)

export default UserInfo
