import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { GET_USER_RECIPES } from '../../queries/User'

const UserRecipes = ({ username }) => (
  <Query query={GET_USER_RECIPES} variables={{ username }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error...</div>
      // console.log(data)
      return (
        <ul>
          <h3>Your Recipes</h3>
          {data.getUserRecipes.map(recipe => (
            <li key={recipe._id}>
              <Link to={`/recipe/${recipe._id}`}>
                <p>{recipe.name}</p>
              </Link>
              <p>Likes: {recipe.likes}</p>
            </li>
          ))}
        </ul>
      )
    }}
  </Query>
)

export default UserRecipes
