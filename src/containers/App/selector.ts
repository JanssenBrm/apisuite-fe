import { createSelector } from 'reselect'
import { Store } from 'store/types'

const authSelector = ({ auth }: Store) => auth

export default createSelector(authSelector, (auth) => ({ auth }))
