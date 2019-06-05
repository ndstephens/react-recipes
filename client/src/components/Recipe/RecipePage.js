import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
// import '../App.css'

import { GET_RECIPE } from '../../queries/Recipe'

import Error from '../Error'
import Spinner from '../Spinner'
import LikeRecipe from './LikeRecipe'

const RecipePage = ({ match }) => {
  const { _id } = match.params
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />
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
          <div className="RecipePage">
            <div className="header">
              <div className="header__image-container">
                <img src={imageUrl} alt="" />
                <div className="header__image-gradient" />
              </div>

              <div className="header__details">
                <div className="header__info">
                  <div>
                    <div className="header__category green lighten-1">
                      {category}
                    </div>
                  </div>
                  <div>
                    Created by <span>{username}</span>
                  </div>
                  <div>
                    Likes: {likes}{' '}
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                  </div>
                </div>
              </div>

              <div className="header__title orange-text text-accent-2">
                {name}
              </div>
            </div>

            <div className="recipe">
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
