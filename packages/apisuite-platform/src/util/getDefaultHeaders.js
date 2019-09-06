/*
 * Default headers for API calls
 */

import { basicb64 } from 'constants/global'

function getDefaultHeaders ({ state, type, token }) {
  const headers = { 'Content-Type': 'application/json' }

  if (type == null) return headers

  switch (type) {
    case 'bearer':
      if (token) {
        headers.Authorization = `Bearer ${token}`
      } else if (state && state.auth && state.auth.authToken) {
        headers.Authorization = `Bearer ${state.auth.authToken}`
      }
      break
    case 'basic':
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
      headers['authorization'] = `Basic ${basicb64}`
      break
    default:
      break
  }

  return headers
}

export default getDefaultHeaders
