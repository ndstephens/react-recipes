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

        const {
          name,
          imageUrl,
          category,
          description,
          instructions,
          likes,
          username,
        } = data.recipe

        return (
          <div className="App">
            {/* <div
              style={{
                background: `url(${imageUrl}) center center / cover no-repeat`,
              }}
              className="recipe-image"
            /> */}

            <div className="recipe">
              <div className="recipe-header">
                <h2 className="recipe-name">
                  <strong>{name}</strong>
                </h2>
                <h5>
                  <strong>{category}</strong>
                </h5>
                <p>
                  Created by <strong>{username}</strong>
                </p>
                <p>
                  Likes: {likes}{' '}
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </p>
              </div>
              <blockquote className="recipe-description">
                {description}
              </blockquote>
              <h3 className="recipe-instructions__title">Instructions</h3>
              <div
                className="recipe-instructions"
                dangerouslySetInnerHTML={{ __html: instructions }}
              />
              <LikeRecipe _id={_id} />
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default withRouter(RecipePage)
