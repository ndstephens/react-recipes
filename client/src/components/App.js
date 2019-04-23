import React from 'react'
import { Query } from 'react-apollo'
import './App.css'

import { GET_ALL_RECIPES } from '../queries/Recipe'

import RecipeItem from './Recipe/RecipeItem'

const App = () => (
  <div className="App">
    <h1 className="main-title">
      Find Recipes You <strong>Love</strong>
    </h1>

    <Query query={GET_ALL_RECIPES}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>

        return (
          <ul className="cards">
            {data.recipes.map(recipe => (
              <RecipeItem key={recipe._id} {...recipe} />
            ))}
          </ul>
        )
      }}
    </Query>
  </div>
)

export default App
