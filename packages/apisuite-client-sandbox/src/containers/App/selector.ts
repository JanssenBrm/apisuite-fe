import { createSelector } from 'reselect'
import { Store } from 'store/types'

const userSelector = ({ auth }: Store) => auth.user

export default createSelector(userSelector, (user) => ({ user }))
