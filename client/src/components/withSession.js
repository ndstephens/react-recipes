import React from 'react'
import { Query } from 'react-apollo'

import { CURRENT_USER } from '../queries/User'

const withSession = Component => props => (
  <Query query={CURRENT_USER}>
    {({ loading, data }) => {
      if (loading) return null
      console.log(data)
      return <Component {...props} />
    }}
  </Query>
)

export default withSession
