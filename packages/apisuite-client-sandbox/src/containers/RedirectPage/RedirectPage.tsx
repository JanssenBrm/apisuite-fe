import * as React from 'react'
import { RedirectPageProps } from './types'
import { useQuery } from 'util/useQuery'
import { Redirect } from 'react-router-dom'
import { useParams } from 'react-router'

const RedirectPage: React.FC<RedirectPageProps> = ({
  confirmRegistration,
  confirmInvite,
}) => {
  const query = useQuery()
  const token = query.get('token')
  const confirmType = useParams<{confirmType: 'invite' | 'registration'}>().confirmType

  React.useEffect(() => {
    if (token && confirmType === 'registration') confirmRegistration(token)
    if (token && confirmType === 'invite') confirmInvite(token)
  }, [confirmRegistration, confirmInvite])

  switch (confirmType) {
    case 'registration':
      return <Redirect to='/auth/login' />

    case 'invite':
      return <Redirect to='/profile/team' />

    default:
      return <Redirect to='/' />
  }
}

export default RedirectPage
