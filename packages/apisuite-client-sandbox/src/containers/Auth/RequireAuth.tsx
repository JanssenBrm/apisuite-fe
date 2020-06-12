import * as React from 'react'
import { RequireAuthProps } from './types'
import { Redirect } from 'react-router'

export const RequireAuth: React.FC<RequireAuthProps> = ({
  auth,
  component: Component,
  ...rest
}) => {
  if (auth) {
    if (auth.user && !auth.isAuthorizing) {
      return <Component {...rest} />
    } else if (!auth.authToken) {
      return <Redirect to='/auth/login' />
    } else {
      return null
    }
  } else {
    return null
  }
}
