import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'

import { GET_RECIPE } from '../../queries/Recipe'

import Error from '../Error'

const RecipePage = ({ match }) => {
  const { _id } = match.params
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <Error error={error} />

        console.log(data)

        return <div>Recipe Page</div>
      }}
    </Query>
  )
}

export default withRouter(RecipePage)
