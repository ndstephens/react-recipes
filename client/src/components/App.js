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
      <div className="page section grey darken-2">
        <div className="container">
          <div className="titles grey-text text-lighten-5">
            <h1 className="left-align title-top">
              Find and{' '}
              <span className="cyan-text text-lighten-2">Favorite</span>
            </h1>
            <h1 className="right-align title-bottom">
              Create and <span className="cyan-text text-lighten-2">Share</span>
            </h1>
          </div>

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
      </div>
    )
  }
}
export default App
