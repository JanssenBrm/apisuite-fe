import * as React from 'react'
import { RequireAuthProps } from './types'
import { Redirect } from 'react-router'

export const RequireAuth: React.FC<RequireAuthProps> = ({ component: Component, auth, ...rest }) => {
  if (auth.user && !auth.isAuthorizing) {
    return <Component {...rest} />
  } else if (!auth.authToken) {
    return <Redirect to='/login' />
  } else {
    return null
  }
}
