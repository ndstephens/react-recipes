import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { CURRENT_USER } from '../queries/User'

const withAuth = conditionFunc => Component => props => (
  <Query query={CURRENT_USER}>
    {({ loading, data }) => {
      if (loading) return null

      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }}
  </Query>
)

export default withAuth
