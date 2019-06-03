import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

import { SEARCH_RECIPES } from '../../queries/Recipe'

import SearchItem from './SearchItem'

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
            // <div className="Search container section">
            //   <div className="row">
            //     <div className="col s12 m8 offset-m2">
            <div className="Search">
              <h2 className="orange-text text-accent-2">Search</h2>
              <div className="input-field">
                <i class="material-icons prefix">search</i>
                <input
                  autoFocus
                  type="text"
                  // className="search"
                  // placeholder="Search for Recipes"
                  id="search_input"
                  onChange={async e => {
                    e.persist()
                    const { data } = await client.query({
                      query: SEARCH_RECIPES,
                      variables: { searchTerm: e.target.value },
                    })
                    this.handleChange(data)
                  }}
                />
                <label htmlFor="search_input">Search for Recipes</label>
              </div>

              {searchResults.length > 0 && (
                <ul>
                  {searchResults.map(recipe => (
                    <SearchItem key={recipe._id} {...recipe} />
                  ))}
                </ul>
              )}
            </div>
            //     </div>
            //   </div>
            // </div>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default Search
