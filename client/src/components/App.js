import React, { Component } from 'react'
import posed from 'react-pose'
import { Query } from 'react-apollo'
import './App.css'

import { GET_ALL_RECIPES } from '../queries/Recipe'

import RecipeItem from './Recipe/RecipeItem'
import Spinner from './Spinner'

const RecipeList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100,
  },
  hidden: {
    x: '-150%',
  },
})

class App extends Component {
  state = { on: false }

  componentDidMount() {
    setTimeout(() => {
      this.slideIn()
    }, 400)
  }

  slideIn = () => {
    this.setState({ on: !this.state.on })
  }

  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Recipes You <strong>Love</strong>
        </h1>

        <Query query={GET_ALL_RECIPES}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner />
            if (error) return <div>Error</div>

            const { on } = this.state
            return (
              <RecipeList pose={on ? 'shown' : 'hidden'} className="cards">
                {data.recipes.map(recipe => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </RecipeList>
            )
          }}
        </Query>
      </div>
    )
  }
}
export default App
