import * as React from 'react'
import { RequireAuthProps } from './types'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { getRoleName } from 'containers/Profile/selectors'
import { validateRoleConfig } from 'util/roleSetup'

export const RequireAuth: React.FC<RequireAuthProps> = ({
  auth,
  roleReq,
  component: Component,
  ...rest
}) => {
  const roleName = useSelector(getRoleName)
  const roleAuthorized = validateRoleConfig(roleReq, roleName ? [roleName] : [])

  if (auth) {
    if (auth.user && !auth.isAuthorizing && roleAuthorized) {
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
