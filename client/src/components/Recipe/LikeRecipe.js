import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { LIKE_RECIPE } from '../../mutations/Recipe'
import withSession from '../withSession'

class LikeRecipe extends Component {
  state = {
    username: '',
  }

  componentDidMount() {
    if (this.props.session && this.props.session.currentUser) {
      const { username } = this.props.session.currentUser
      // console.log(username)
      this.setState({ username })
    }
  }

  handleLike = likeRecipe => {
    likeRecipe().then(({ data }) => {
      console.log(data)
    })
  }

  render() {
    const { username } = this.state
    const { _id } = this.props

    return (
      <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
        {likeRecipe =>
          username && (
            <button onClick={() => this.handleLike(likeRecipe)}>Like</button>
          )
        }
      </Mutation>
    )
  }
}

export default withSession(LikeRecipe)
