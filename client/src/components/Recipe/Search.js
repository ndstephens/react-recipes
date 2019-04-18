import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import { SEARCH_RECIPES } from '../../queries/Recipe'

import Error from '../Error'

const Search = () => (
  <Query query={SEARCH_RECIPES} variable={{ searchTerm: '' }}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <Error error={error} />
      console.log(data)

      return (
        <div className="App">
          <input type="search" />
          <ul>
            {data.searchRecipes.map(recipe => (
              <li key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`}>
                  <h4>{recipe.name}</h4>
                </Link>
                <p>{recipe.likes}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    }}
  </Query>
)

export default Search
