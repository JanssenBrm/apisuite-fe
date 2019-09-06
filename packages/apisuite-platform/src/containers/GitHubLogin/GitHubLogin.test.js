import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import GitHubLogin from './GitHubLogin'
import qs from 'qs'

describe('<GitHubLogin />', () => {
  const props = {
    auth: {
      isAutorizing: false,
      authToken: null
    },
    location: { search: '?access_token=1234' },
    ghLogin: jest.fn(),
    intl: {}
  }
  const wrapper = mountWithIntl(<GitHubLogin {...props} />)

  it('should call ghLogin with access token', () => {
    expect(wrapper.find('div')).toHaveLength(1)
    const query = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    const { access_token } = query
    expect(props.ghLogin).toHaveBeenCalledWith(access_token)
  })
})
