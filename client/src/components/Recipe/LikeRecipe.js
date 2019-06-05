import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { LIKE_RECIPE } from '../../mutations/Recipe'
import withSession from '../withSession'

class LikeRecipe extends Component {
  state = {
    liked: false,
    username: '',
  }

  componentDidMount() {
    if (this.props.session && this.props.session.currentUser) {
      const { username, favorites } = this.props.session.currentUser
      const { _id } = this.props
      // Check if current user has already added this recipe to their favorites
      const isLiked = favorites.some(favorite => favorite._id === _id)
      this.setState({
        liked: isLiked,
        username,
      })
    }
  }

  handleClick = likeRecipe => {
    this.setState(
      prevState => ({
        liked: !prevState.liked,
      }),
      () => this.handleLike(likeRecipe)
    )
  }

  handleLike = likeRecipe => {
    likeRecipe().then(async ({ data }) => {
      await this.props.refetch()
    })
  }

  render() {
    const { username, liked } = this.state
    const { _id } = this.props

    return (
      <Mutation mutation={LIKE_RECIPE} variables={{ _id, username, liked }}>
        {likeRecipe =>
          username && (
            <button
              className="btn waves-effect waves-light orange accent-2"
              onClick={() => this.handleClick(likeRecipe)}
            >
              {liked ? (
                <span>
                  <i className="material-icons left">thumb_down</i>
                  Unlike
                </span>
              ) : (
                <span>
                  <i className="material-icons left">thumb_up</i>
                  Like
                </span>
              )}
            </button>
          )
        }
      </Mutation>
    )
  }
}

export default withSession(LikeRecipe)
