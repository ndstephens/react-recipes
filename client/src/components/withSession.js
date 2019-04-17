import React from 'react'
import { Query } from 'react-apollo'

import { CURRENT_USER } from '../queries/User'

const withSession = Component => props => (
  <Query query={CURRENT_USER}>
    {({ loading, data, refetch }) => {
      if (loading) return null
      console.log(data)
      return <Component {...props} refetch={refetch} />
    }}
  </Query>
)

export default withSession
