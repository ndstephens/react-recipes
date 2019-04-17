import React from 'react'
import { Query } from 'react-apollo'
import './App.css'

import { GET_ALL_RECIPES } from '../queries/Recipe'

import RecipeItem from './Recipe/RecipeItem'

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>

        // console.log(data)
        return (
          <ul>
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
