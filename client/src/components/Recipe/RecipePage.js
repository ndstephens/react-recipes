import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'

import { GET_RECIPE } from '../../queries/Recipe'

import Error from '../Error'
import LikeRecipe from './LikeRecipe'

const RecipePage = ({ match }) => {
  const { _id } = match.params
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <Error error={error} />

        // console.log(data)

        return (
          <div className="App">
            <h2>{data.recipe.name}</h2>
            <p>Category: {data.recipe.category}</p>
            <p>Description: {data.recipe.description}</p>
            <p>Instructions: {data.recipe.instructions}</p>
            <p>Likes: {data.recipe.likes}</p>
            <p>Created By: {data.recipe.username}</p>
            <LikeRecipe _id={_id} />
          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(RecipePage)
