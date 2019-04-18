import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Link } from 'react-router-dom'

import { SEARCH_RECIPES } from '../../queries/Recipe'

class Search extends Component {
  state = {
    searchResults: [],
  }

  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResults: searchRecipes,
    })
  }

  render() {
    const { searchResults } = this.state

    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                placeholder="Search for Recipes"
                onChange={async e => {
                  e.persist()
                  const { data } = await client.query({
                    query: SEARCH_RECIPES,
                    variables: { searchTerm: e.target.value },
                  })
                  this.handleChange(data)
                }}
              />
              <ul>
                {searchResults.map(recipe => (
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
      </ApolloConsumer>
    )
  }
}

export default Search
